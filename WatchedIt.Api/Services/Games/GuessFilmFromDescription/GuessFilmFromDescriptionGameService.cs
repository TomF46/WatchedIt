using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.Games.GuessFilmFromDescription;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.Games.GuessFilmFromDescription
{
    public class GuessFilmFromDescriptionGameService : IGuessFilmFromDescriptionGameService
    {
        private readonly WatchedItContext _context;

        public GuessFilmFromDescriptionGameService(WatchedItContext context)
        {
            _context = context;
        }

        public async Task<PaginationResponse<GetGuessFilmFromDescriptionGameDto>> GetAllForUser(int userId, PaginationParameters parameters)
        {
            var query = _context.GuessFilmFromDescriptionGames.Include(x => x.Rounds).ThenInclude(y => y.Film).Where(x => x.User.Id == userId).OrderByDescending(x => x.CreatedDate);
            var count = query.Count();
            var games = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedGames = games.Select(g => GameMapper.MapGuessFilmFromDescriptionGame(g)).ToList();
            return new PaginationResponse<GetGuessFilmFromDescriptionGameDto>(mappedGames, parameters.PageNumber, parameters.PageSize, count);
        }

        public async Task<GetGuessFilmFromDescriptionGameDto> GetById(int id, int userId)
        {
            var game = await _context.GuessFilmFromDescriptionGames.Include(x => x.Rounds).ThenInclude(y => y.Film).FirstOrDefaultAsync(g => g.Id == id);
            if(game is null) throw new NotFoundException($"Game with Id '{id}' not found.");
            if(game.User.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User cant view this game");


            return GameMapper.MapGuessFilmFromDescriptionGame(game);
        }

        public async Task<GetGuessFilmFromDescriptionGameDto> StartGame(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user is null) throw new BadRequestException($"User with Id '{userId}' not found.");

            var game = new GuessFilmFromDescriptionGame{
                Rounds = new List<GuessFilmFromDescriptionRound>(),
                User = user,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
            };

            game.Rounds.Add(AddNewRound(game));

            await _context.GuessFilmFromDescriptionGames.AddAsync(game);
            await _context.SaveChangesAsync();

            return GameMapper.MapGuessFilmFromDescriptionGame(game);
            
        }

        public async Task<GetGuessFilmFromDescriptionGameDto> Guess(int gameId, int userId, GuessFilmFromDescriptionGameGuessDto guess)
        {
            var game = await _context.GuessFilmFromDescriptionGames.Include(x => x.Rounds).ThenInclude(x => x.Film).Include(x => x.User).FirstOrDefaultAsync(g => g.Id == gameId);
            if(game is null) throw new NotFoundException($"Game with Id '{gameId}' not found.");

            if(game.User.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User cant play this game.");
            if(game.Status != GameStatus.InProgress) throw new Exceptions.UnauthorizedAccessException($"This game has been completed, and cant be played again.");

            var round = game.Rounds.FirstOrDefault(x => x.Id == guess.RoundId);
            if(round is null) throw new BadRequestException("Round Id does not match a round in this game");
            if(round.Status != GameRoundStatus.InProgress) throw new Exceptions.UnauthorizedAccessException($"This round has been completed, and cant be played again.");

            if(guess.FilmId == round.Film.Id){
                round.Status = GameRoundStatus.CompletedSuccess;
                game.Score = game.Score + 1;
                var nextRound = AddNewRound(game);
                if(nextRound is null){
                    game.Status = GameStatus.CompletedLimit; // If you run out of films then set an indicator
                } else {
                    game.Rounds.Add(nextRound);
                }
            } else {
                round.Status = GameRoundStatus.CompletedFail;
                game.Status = GameStatus.CompletedSuccess;
            }

            game.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();
            return GameMapper.MapGuessFilmFromDescriptionGame(game);
        }

        public async Task<GetGuessFilmFromDescriptionGameDto> Forfeit(int gameId, int userId)
        {
            var game = await _context.GuessFilmFromDescriptionGames.Include(x => x.Rounds).ThenInclude(x => x.Film).Include(x => x.User).FirstOrDefaultAsync(g => g.Id == gameId);
            if(game is null) throw new NotFoundException($"Game with Id '{gameId}' not found.");

            if(game.User.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User cant forefeit this game.");
            if(game.Status != GameStatus.InProgress) throw new Exceptions.UnauthorizedAccessException($"Completed games can not be forfeit.");

            game.Status = GameStatus.Forfeit;
            game.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();
            return GameMapper.MapGuessFilmFromDescriptionGame(game);
        }

        public async Task<PaginationResponse<GetGuessFilmFromDescriptionLeaderboardEntryDto>> GetLeaderboard(PaginationParameters parameters)
        {
            var query = _context.GuessFilmFromDescriptionGames.Include(x => x.User).Include(x => x.Rounds).Where(x => x.Status == GameStatus.CompletedSuccess).OrderByDescending(x => x.Score);
            var count = query.Count();
            var games = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedGames = games.Select(g => GameMapper.MapGuessFilmFromDescriptionLeaderboardEntry(g)).ToList();
            return new PaginationResponse<GetGuessFilmFromDescriptionLeaderboardEntryDto>(mappedGames, parameters.PageNumber, parameters.PageSize, count);
        }

        private GuessFilmFromDescriptionRound? AddNewRound(GuessFilmFromDescriptionGame game)
        {
            var previousRoundFilms = game.Rounds.Select(x => x.Film);

            var query = _context.Films.Where(f => !previousRoundFilms.Contains(f));

            if(!query.Any()) return null;
            var rand = new Random();
            var skip = rand.Next(0, query.Count());
            var film = query.Skip(skip).Take(1).First();

            return new GuessFilmFromDescriptionRound{
                Film = film,
                Status = GameRoundStatus.InProgress
            };
        }
    }
}