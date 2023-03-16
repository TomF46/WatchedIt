using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Microsoft.EntityFrameworkCore;

namespace WatchedIt.Tests
{
    public class InMemoryDbContextFactory
    {
        public WatchedItContext GetDBContext(){
            var options = new DbContextOptionsBuilder<WatchedItContext>()
                            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
                            .Options;
            var dbContext = new WatchedItContext(options);

            return dbContext;
        }
    }
}