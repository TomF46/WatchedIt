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
                        Id = 1,
                        Name = "WatchedIt Recommended",
                        Type = TagType.Recommended
                    },
                    new Tag{
                        Id = 2,
                        Name = "Critics choice",
                        Type = TagType.Recommended
                    },
                    new Tag{
                        Id = 3,
                        Name = "English",
                        Type = TagType.Language
                    },
                    new Tag{
                        Id = 4,
                        Name = "Spanish",
                        Type = TagType.Language
                    },
                    new Tag{
                        Id = 5,
                        Name = "French",
                        Type = TagType.Language
                    },
                    new Tag{
                        Id = 6,
                        Name = "German",
                        Type = TagType.Language
                    },
                    new Tag{
                        Id = 7,
                        Name = "Japanese",
                        Type = TagType.Language
                    },
                    new Tag{
                        Id = 8,
                        Name = "U",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Id = 9,
                        Name = "PG",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Id = 10,
                        Name = "12A",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Id = 11,
                        Name = "12",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Id = 12,
                        Name = "15",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Id = 13,
                        Name = "18",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Id = 14,
                        Name = "R",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Id = 15,
                        Name = "NC-17",
                        Type = TagType.AgeRating
                    },
                    new Tag{
                        Id = 16,
                        Name = "Italian",
                        Type = TagType.Language
                    },
                };

                _context.Database.OpenConnection();
                try
                {
                    _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Tags ON");
                    _context.Tags.AddRange(tags);
                    _context.SaveChanges();
                    _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Tags OFF");
                }
                finally
                {
                    _context.Database.CloseConnection();
                }
            }
        }
    }
}