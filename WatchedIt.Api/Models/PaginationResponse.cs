using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models
{
    public class PaginationResponse<T>
    {
        
        public List<T> Data {get; private set;} = new List<T>();
        public int PageNumber {get; private set;}
        public int PageSize {get; private set;}
        public int Of {get; private set;}
        public int From {get; private set;}
        public int To {get; private set;}
        public bool LastPage {get; set;}

        public PaginationResponse(List<T> data, int pageNumber, int pageSize, int count)
        {
            Data = data;
            PageNumber = pageNumber;
            PageSize = pageSize;
            Of = count;
            From = 1 + (pageSize * (pageNumber - 1));
            To = pageNumber * pageSize < count ? pageNumber * pageSize : count;
            LastPage = (pageNumber * pageSize) >= count;
        }

    }
}