using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models
{
    public class PersonBirthdaySearchWithPaginationParameters : PaginationParameters
    {
        public DateTime? Date { get; set; }
    }
}