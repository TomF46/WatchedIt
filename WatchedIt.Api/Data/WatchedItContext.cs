using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Film;

namespace Data
{
    public class WatchedItContext : DbContext
    {
        public WatchedItContext(DbContextOptions<WatchedItContext> options) : base(options)
        {
            
        }

        public DbSet<Film> Films => Set<Film>();
    }
}