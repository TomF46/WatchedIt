using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.FilmListModels;
using WatchedIt.Api.Services.FilmListService;
using Microsoft.AspNetCore.Authorization;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilmListsController : ControllerBase
    {
        public readonly IFilmListService _filmListService;
        public FilmListsController(IFilmListService filmListService)
        {
            _filmListService = filmListService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetFilmListOverviewDto>>> Get([FromQuery] PaginationParameters paginationParameters){
            return Ok(await _filmListService.GetAll(paginationParameters));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetFilmListDto>> GetSingle(int id){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _filmListService.GetById(id, userId));
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<GetFilmListOverviewDto>> AddFilmList(AddFilmListDto newFilmList){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _filmListService.Add(userId, newFilmList));
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<GetFilmListOverviewDto>> UpdateFilmList(int id, UpdateFilmListDto updateFilmListDto){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _filmListService.Update(id, userId, updateFilmListDto));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult DeleteFilmList(int id){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            _filmListService.Delete(id, userId);
            return Ok();
        }

        [Authorize]
        [HttpPost("{id}/films")]
        public async Task<ActionResult<GetFilmListDto>> AddFilmToFilmList(int id, AddFilmToFilmListDto addFilmToFilmListDto){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _filmListService.AddFilmToListById(id, userId, addFilmToFilmListDto));
        }

        [Authorize]
        [HttpPost("{id}/films/remove")]
        public async Task<ActionResult<GetFilmListDto>> RemoveFilmFromFilmList(int id, RemoveFilmForFilmListDto removeFilmForFilmListDto){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _filmListService.RemoveFilmFromListById(id, userId, removeFilmForFilmListDto));
        } 
    }
}