using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.UserModels;

namespace WatchedIt.Api.Models.NotificationModels
{
    public class GetNotificationDto
    {
        public int Id {get;set;}
        public GetSimpleUserDto Recipient {get; set;}
        public string? Text {get;set;}
        public NotificationType Type {get;set;}
        public DateTime SentDate { get; set; }
        public bool Read {get; set;}
        
    }
}