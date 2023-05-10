using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.CommentModels;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.NotificationModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.NotificationService
{
    public class NotificationService : INotificationService
    {
        public readonly WatchedItContext _context;
        public NotificationService(WatchedItContext context)
        {
            _context = context;
        }

        public async Task<PaginationResponse<GetNotificationDto>> GetAllForUserById(int userId, PaginationParameters parameters)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user is null) throw new NotFoundException($"User with Id '{userId}' not found.");

            var query = _context.Notifications.Include(n => n.Recipient).Where(x => x.Recipient.Id == user.Id).AsQueryable();
            var count = query.Count();
            var notifications = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedNotifications = notifications.Select(n => NotificationMapper.map(n)).ToList();
            return new PaginationResponse<GetNotificationDto>(mappedNotifications, parameters.PageNumber, parameters.PageSize, count);
        }

        public async Task<PaginationResponse<GetNotificationDto>> GetUnreadForUserById(int userId, PaginationParameters parameters)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user is null) throw new NotFoundException($"User with Id '{userId}' not found.");

            var query = _context.Notifications.Include(n => n.Recipient).Where(n => !n.Read).Where(x => x.Recipient.Id == user.Id).AsQueryable();
            var count = query.Count();
            var notifications = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedNotifications = notifications.Select(n => NotificationMapper.map(n)).ToList();
            return new PaginationResponse<GetNotificationDto>(mappedNotifications, parameters.PageNumber, parameters.PageSize, count);
        }

        public async Task<GetNotificationCountDto> GetUnreadNotificationCount(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user is null) throw new NotFoundException($"User with Id '{userId}' not found.");
            var query = _context.Notifications.Include(n => n.Recipient).Where(n => !n.Read).Where(x => x.Recipient.Id == user.Id).AsQueryable();
            var count = query.Count();
            return new GetNotificationCountDto{
                Count = count
            };
        }

        public async Task<GetNotificationDto> sendNewCommentOnOwnedReviewNotification(User user, ReviewComment comment)
        {
            var notification = new Notification{
                Type = Models.Enums.NotificationType.NewCommentOnOwnedReview,
                Recipient = user,
                Text = $"{comment.User.Username} has commented on your review for {comment.Review.Film.Name}",
                SentDate = DateTime.Now
            };
            await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();
            return NotificationMapper.map(notification);
        }

        public async Task<GetNotificationDto> sendNewRoleForLikedPersonNotification(User user, Credit credit)
        {
            var notification = new Notification{
                Type = Models.Enums.NotificationType.NewRoleForLikedPerson,
                Recipient = user,
                Text = $"A person you like has a new credit, {credit.Person.FirstName} {credit.Person.LastName} as {credit.Role} in {credit.Film.Name}",
                SentDate = DateTime.Now
            };
            await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();
            return NotificationMapper.map(notification);
        }

        public async Task<GetNotificationDto> SetRead(int userId, int notificationId)
        {
            var notification = await _context.Notifications.Include(n => n.Recipient).FirstOrDefaultAsync(n => n.Id == notificationId);
            if(notification is null) throw new NotFoundException($"Notification with Id '{notificationId}' not found.");

            if(notification.Recipient.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User does not own this notification");

            notification.Read = true;
            await _context.SaveChangesAsync();
            return NotificationMapper.map(notification);
        }
    }
}