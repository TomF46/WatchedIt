using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.TagModels;
using WatchedIt.Api.Models.Enums;

namespace WatchedIt.Api.Data.Seeders
{
    public class TagSeeder
    {
        private readonly WatchedItContext _context;

        public TagSeeder(WatchedItContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            if (!_context.Tags.Any())
            {
                var tags = new List<Tag>()
                {
                    new Tag{
                        Name = "WatchedIt Recommended",
                        Type = TagType.Recommended
                    },
                    new Tag{
                        Name = "Critics choice",
                        Type = TagType.Recommended
                    },
                    new Tag{
                        Name = "English",
                        Type = TagType.Language
                    },
                    new Tag{
                        Name = "Spanish",
                        Type = TagType.Language
                    },
                    new Tag{
                        Name = "French",
                        Type = TagType.Language
                    },
                    new Tag{
                        Name = "German",
                        Type = TagType.Language
                    },
                    new Tag{
                        Name = "Japanese",
                        Type = TagType.Language
                    },
                    new Tag{
                        Name = "U",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Name = "PG",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Name = "12A",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Name = "12",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Name = "15",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Name = "18",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Name = "R",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Name = "NC-17",
                        Type = TagType.AgeRating
                    },
                };

                _context.Tags.AddRange(tags);
                _context.SaveChanges();
            }
        }
    }
}