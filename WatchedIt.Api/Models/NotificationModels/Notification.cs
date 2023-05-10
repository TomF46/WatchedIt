using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.Enums;

namespace WatchedIt.Api.Models.NotificationModels
{
    public class Notification
    {
        public int Id { get; set;}
        [Required]
        public NotificationType Type {get;set;}
        [Required]
        public User Recipient {get; set;}
        public string Text {get;set;}
        public bool Read {get; set;} = false;
        public DateTime SentDate { get; set; }
    }
}