using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.Games.GuessFilmFromCast;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.Games.GuessFilmFromCast
{
    public class GuessFilmFromCastGameService : IGuessFilmFromCastGameService
    {
        private readonly WatchedItContext _context;

        public GuessFilmFromCastGameService(WatchedItContext context)
        {
            _context = context;
        }
        
        public async Task<PaginationResponse<GetGuessFilmFromCastGameDto>> GetAllForUser(int userId, PaginationParameters parameters)
        {
            var query = _context.GuessFilmFromCastGames.Include(x => x.Clues).Include(x => x.Film).Where(x => x.User.Id == userId);
            var count = query.Count();
            query.OrderByDescending(x => x.CreatedDate);
            var games = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedGames = games.Select(g => GameMapper.MapGuessFilmFromCastGame(g)).ToList();
            return new PaginationResponse<GetGuessFilmFromCastGameDto>(mappedGames, parameters.PageNumber, parameters.PageSize, count);
        }

        public async Task<GetGuessFilmFromCastGameDto> GetById(int id, int userId)
        {
            var game = await _context.GuessFilmFromCastGames.Include(x => x.Clues).Include(x => x.User).Include(x => x.Film).FirstOrDefaultAsync(g => g.Id == id);
            if(game is null) throw new NotFoundException($"Game with Id '{id}' not found.");
            if(game.User.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User cant view this game");


            return GameMapper.MapGuessFilmFromCastGame(game);
        }

        public async Task<GetGuessFilmFromCastGameDto> StartGame(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user is null) throw new BadRequestException($"User with Id '{userId}' not found.");

            var game = new GuessFilmFromCastGame{
                Film = await GetFilmForGame(),
                User = user,
                Clues = new List<Person>(),
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
            };

            game.Clues.Add(await GetPersonForClue(game));

            await _context.GuessFilmFromCastGames.AddAsync(game);
            await _context.SaveChangesAsync();

            return GameMapper.MapGuessFilmFromCastGame(game);
        }

        public async Task<GetGuessFilmFromCastGameDto> Guess(int gameId, int userId, GuessFilmFromCastGameGuessDto guess)
        {
            var game = await _context.GuessFilmFromCastGames.Include(x => x.Clues).Include(x => x.Film).Include(x => x.User).FirstOrDefaultAsync(g => g.Id == gameId);
            if(game is null) throw new NotFoundException($"Game with Id '{gameId}' not found.");

            if(game.User.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User cant play this game");
            if(game.Status != GameStatus.InProgress) throw new Exceptions.UnauthorizedAccessException($"This game has been completed");


            if(guess.FilmId == game.Film.Id){
                game.Status = GameStatus.CompletedSuccess;
            } else {

                var newClue = await GetPersonForClue(game);
                if(newClue is null){
                    game.Status = GameStatus.CompletedFail;
                } else {
                    game.Clues.Add(newClue);
                }
            }

            game.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();
            return GameMapper.MapGuessFilmFromCastGame(game);
        }

        private async Task<Film> GetFilmForGame()
        {
            var query = _context.Films.Include(f => f.Credits).Where(f => f.Credits.Count() > 1);
            var rand = new Random();
            var skip = rand.Next(0, query.Count());
            var film = await query.Skip(skip).Take(1).FirstOrDefaultAsync();
            if(film is null) throw new BadRequestException($"Not enough films in system to play game.");
            return film;
        }

        private async Task<Person?> GetPersonForClue(GuessFilmFromCastGame game)
        {
            var film = await _context.Films.Include(f => f.Credits).ThenInclude(x => x.Person).FirstOrDefaultAsync(f => f.Id == game.Film.Id);
            if(film is null) throw new BadRequestException($"Film with Id '{game.Film.Id}' not found.");

            var existingClues = game.Clues;
            var query = film.Credits.Where(f => !existingClues.Contains(f.Person));
            if(!query.Any()) return null;
            var rand = new Random();
            var skip = rand.Next(0, query.Count());
            var credit = query.Skip(skip).Take(1).First();

            return credit.Person;
        }
    }
}