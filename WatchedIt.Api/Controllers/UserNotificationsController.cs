using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using WatchedIt.Api.Models.NotificationModels;
using WatchedIt.Api.Services.Mapping;
using WatchedIt.Api.Services.NotificationService;

namespace WatchedIt.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/Users/me/notifications")]
    public class UserNotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        public UserNotificationsController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetNotificationDto>>> Get([FromQuery] PaginationParameters parameters)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _notificationService.GetAllForUserById(userId, parameters));
        }

        [HttpGet("unread")]
        public async Task<ActionResult<PaginationResponse<GetNotificationDto>>> GetUnread([FromQuery] PaginationParameters parameters)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _notificationService.GetUnreadForUserById(userId, parameters));
        }

        [HttpGet("unread/count")]
        public async Task<ActionResult<PaginationResponse<GetNotificationDto>>> GetUnreadCount()
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _notificationService.GetUnreadNotificationCount(userId));
        }

        [HttpPut("{id}/read")]
        public async Task<ActionResult<GetNotificationDto>> Read(int id)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _notificationService.SetRead(userId, id));
        }
    }
}