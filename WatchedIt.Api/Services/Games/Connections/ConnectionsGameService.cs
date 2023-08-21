using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.Games.Connections;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.Games.Connections
{
    public class ConnectionsGameService : IConnectionsGameService
    {
        private readonly WatchedItContext _context;

        public ConnectionsGameService(WatchedItContext context)
        {
            _context = context;
        }

        public async Task<PaginationResponse<GetConnectionsGameDto>> GetAllForUser(int userId, PaginationParameters parameters)
        {
            var query = _context.ConnectionsGames.Include(x => x.Clues).ThenInclude(y => y.Credit).ThenInclude(x => x.Film).Include(x => x.Clues).ThenInclude(y => y.Credit).ThenInclude(x => x.Person).Where(x => x.User.Id == userId).OrderByDescending(x => x.CreatedDate);
            var count = query.Count();
            var games = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedGames = games.Select(g => GameMapper.MapConnectionsGame(g)).ToList();
            return new PaginationResponse<GetConnectionsGameDto>(mappedGames, parameters.PageNumber, parameters.PageSize, count);
        }

        public async Task<GetConnectionsGameDto> GetById(int id, int userId)
        {
            var game = await _context.ConnectionsGames.Include(x => x.Person).Include(x => x.Clues).ThenInclude(y => y.Credit).ThenInclude(x => x.Film).Include(x => x.Clues).ThenInclude(y => y.Credit).ThenInclude(x => x.Person).FirstOrDefaultAsync(x => x.Id == id);
            if(game is null) throw new NotFoundException($"Game with Id '{id}' not found.");
            if(game.User.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User cant view this game");

            return GameMapper.MapConnectionsGame(game);
        }

        public async Task<GetConnectionsGameDto> StartGame(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user is null) throw new BadRequestException($"User with Id '{userId}' not found.");

            var game = new ConnectionsGame{
                Person = await GetPersonForGame(),
                Clues = new List<ConnectionsGameClue>(),
                User = user,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
            };

            game.Clues.Add(await GetCreditForClue(game));

            await _context.ConnectionsGames.AddAsync(game);
            await _context.SaveChangesAsync();

            return GameMapper.MapConnectionsGame(game);
        }

        public async Task<GetConnectionsGameDto> Guess(int gameId, int userId, GuessPersonForConnectionGameDto guess)
        {
            var game = await _context.ConnectionsGames.Include(x => x.Person).Include(x => x.Clues).ThenInclude(y => y.Credit).ThenInclude(x => x.Film).Include(x => x.Clues).ThenInclude(y => y.Credit).ThenInclude(x => x.Person).FirstOrDefaultAsync(x => x.Id == gameId);
            if(game is null) throw new NotFoundException($"Game with Id '{gameId}' not found.");
            if(game.User.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User cant view this game");
            if(game.Status != GameStatus.InProgress) throw new Exceptions.UnauthorizedAccessException($"This game has been completed");

            if(guess.PersonId == game.Person.Id){
                game.Status = GameStatus.CompletedSuccess;
            } else {
                var newClue = await GetCreditForClue(game);
                if(newClue is null){
                    game.Status = GameStatus.CompletedFail;
                } else {
                    game.Clues.Add(newClue);
                }
            }

            game.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();
            return GameMapper.MapConnectionsGame(game);
        }   

        public async Task<GetConnectionsGameDto> Forfeit(int gameId, int userId)
        {
            var game = await _context.ConnectionsGames.Include(x => x.Clues).ThenInclude(y => y.Credit).ThenInclude(x => x.Film).Include(x => x.Clues).ThenInclude(y => y.Credit).ThenInclude(x => x.Person).FirstOrDefaultAsync(x => x.Id == gameId);
            if(game is null) throw new NotFoundException($"Game with Id '{gameId}' not found.");

            if(game.User.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User cant forefeit this game.");
            if(game.Status != GameStatus.InProgress) throw new Exceptions.UnauthorizedAccessException($"Completed games can not be forfeit.");

            game.Status = GameStatus.Forfeit;
            game.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();
            return GameMapper.MapConnectionsGame(game);
        }

        private async Task<Person> GetPersonForGame()
        {
            var query = _context.People.Include(f => f.Credits).Where(f => f.Credits.Count() > 0);
            var rand = new Random();
            var skip = rand.Next(0, query.Count());
            var person = await query.Skip(skip).Take(1).FirstOrDefaultAsync();
            if(person is null) throw new BadRequestException($"Not enough people in system to play game.");
            return person;
        }

        private async Task<ConnectionsGameClue> GetCreditForClue(ConnectionsGame game)
        {
            var person = await _context.People.Include(p => p.Credits).ThenInclude(x => x.Film).ThenInclude(x => x.Credits).FirstOrDefaultAsync(p => p.Id == game.Person.Id);
            if(person is null) throw new BadRequestException($"Person with Id '{game.Person.Id}' not found.");
            
            var existingClues = game.Clues.Select(x => x.Credit);
            var films = person.Credits.Select(x => x.Film).Distinct();
            var mutualCredits = films.SelectMany(x => x.Credits).Where(x => x.PersonId != person.Id);
            
            if(!mutualCredits.Any()) return null;

            var rand = new Random();
            var skip = rand.Next(0, mutualCredits.Count());
            var result = mutualCredits.Skip(skip).Take(1).First();

            var credit = await _context.Credits.Include(c => c.Film).Include(c => c.Person).FirstOrDefaultAsync(c => c.Id == result.Id);

            return new ConnectionsGameClue{
                Credit = credit
            };
        }
    }
}