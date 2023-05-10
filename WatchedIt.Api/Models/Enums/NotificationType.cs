using System.Text.Json.Serialization;

namespace WatchedIt.Api.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum NotificationType
    {
        NewCommentOnOwnedReview = 1,
        NewRoleForLikedPerson = 2
    }
}