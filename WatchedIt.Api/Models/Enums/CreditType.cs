using System.Text.Json.Serialization;

namespace WatchedIt.Api.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum CreditType
    {
        Cast = 1,
        Crew = 2
    }
}