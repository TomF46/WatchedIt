using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmListModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.FilmListService
{
    public class FilmListService : IFilmListService
    {
        public readonly WatchedItContext _context;
        public FilmListService(WatchedItContext context)
        {
            _context = context;
        }

        public async Task<List<GetFilmListOverviewDto>> GetAll(PaginationParameters paginationParameters)
        {
            var lists = await _context.FilmLists.Include(f => f.CreatedBy).Include(f => f.Films).Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize).Take(paginationParameters.PageSize).ToListAsync();
            return lists.Select(l => FilmListMapper.mapOverview(l)).ToList();
        }

        public async Task<GetFilmListDto> GetById(int id)
        {
            var list = await _context.FilmLists.Include(f => f.CreatedBy).Include(f => f.Films).FirstOrDefaultAsync(x => x.Id == id);
            if(list is null) throw new NotFoundException($"Film list with Id '{id} not found.");
            return FilmListMapper.map(list);
        }

        public async Task<GetFilmListOverviewDto> Add(int userId, AddFilmListDto newFilmList)
        {
            var list = FilmListMapper.mapForAddition(newFilmList);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user is null) throw new BadRequestException($"User with Id '{userId}' does not exist");

            list.CreatedBy = user;

            await _context.FilmLists.AddAsync(list);
            await _context.SaveChangesAsync();
            return FilmListMapper.mapOverview(list);
        }

        public async Task<GetFilmListOverviewDto> Update(int id, int userId, UpdateFilmListDto updatedFilmList)
        {
            var list = await _context.FilmLists.Include(f => f.CreatedBy).FirstOrDefaultAsync(f => f.Id == id);
            if(list is null) throw new NotFoundException($"Film list with Id '{id}' not found.");

            if(list.CreatedBy.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User does not own this list");

            list.Name = updatedFilmList.Name;
            list.Description = updatedFilmList.Description;
            await _context.SaveChangesAsync();
            return FilmListMapper.mapOverview(list);
        }

        public void Delete(int id, int userId)
        {
            var list = _context.FilmLists.Include(f => f.CreatedBy).FirstOrDefault(f => f.Id == id);
            if(list is null) throw new NotFoundException($"Film list with Id '{id}' not found.");

            if(list.CreatedBy.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User does not own this list");

            _context.FilmLists.Remove(list);
            _context.SaveChangesAsync();
            return;
        }

        public async Task<GetFilmListDto> AddFilmToListById(int id, int userId, AddFilmToFilmListDto newFilm)
        {
            var list = await _context.FilmLists.Include(f => f.CreatedBy).Include(f => f.Films).FirstOrDefaultAsync(f => f.Id == id);
            if(list is null) throw new NotFoundException($"Film list with Id '{id}' not found.");

            if(list.CreatedBy.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User does not own this list");

            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == newFilm.FilmId);
            if(film is null) throw new BadRequestException($"Film with Id '{id}' not found.");

            list.Films.Add(film);
            await _context.SaveChangesAsync();
            return FilmListMapper.map(list);
        }

        public async Task<GetFilmListDto> RemoveFilmFromListById(int id, int userId, RemoveFilmForFilmListDto filmToRemove)
        {
            var list = await _context.FilmLists.Include(f => f.CreatedBy).Include(f => f.Films).FirstOrDefaultAsync(f => f.Id == id);
            if(list is null) throw new NotFoundException($"Film list with Id '{id}' not found.");

            if(list.CreatedBy.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User does not own this list");

            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == filmToRemove.FilmId);
            if(film is null) throw new BadRequestException($"Film with Id '{id}' not found.");

            list.Films.Remove(film);
            await _context.SaveChangesAsync();
            return FilmListMapper.map(list);
        }
    }
}