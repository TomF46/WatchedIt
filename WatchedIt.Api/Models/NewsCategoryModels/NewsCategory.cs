using System.ComponentModel.DataAnnotations;

using WatchedIt.Api.Models.News;

namespace WatchedIt.Api.Models.NewsCategoryModels
{
    public class NewsCategory
    {
        
        public int Id { get; set;}
        [Required]
        [StringLength(30, ErrorMessage = "Name can't be longer than 30 characters.")]
        public string Name { get; set;}
        public ICollection<NewsArticle> NewsArticles { get; set; } = new List<NewsArticle>();
    }
}