using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.CommentModels;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.NotificationModels;
using WatchedIt.Api.Models.ReviewModels;

namespace WatchedIt.Api.Services.NotificationService
{
    public interface INotificationService
    {
        Task<PaginationResponse<GetNotificationDto>> GetAllForUserById(int userId, PaginationParameters parameters);
        Task<PaginationResponse<GetNotificationDto>> GetUnreadForUserById(int userId, PaginationParameters parameters);
        Task<GetNotificationDto> sendNewCommentOnOwnedReviewNotification(User user, ReviewComment comment);
        Task<GetNotificationDto> sendNewRoleForLikedPersonNotification(User user, Credit credit);
        Task<GetNotificationDto> SetRead(int userId, int notificationId);
        Task<GetNotificationCountDto> GetUnreadNotificationCount(int userId);
    }
}