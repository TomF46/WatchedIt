using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.NotificationModels;

namespace WatchedIt.Api.Services.Mapping
{
    public static class NotificationMapper
    {
        public static GetNotificationDto map(Notification notification){
            return new GetNotificationDto {
                Id = notification.Id,
                Recipient = UserMapper.MapSimpleUser(notification.Recipient),
                Text = notification.Text,
                Type = notification.Type,
                SentDate = notification.SentDate,
                Read = notification.Read
            };
        }
    }
}