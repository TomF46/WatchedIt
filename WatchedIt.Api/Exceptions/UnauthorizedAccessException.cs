using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace WatchedIt.Api.Exceptions
{
    public class UnauthorizedAccessException : CustomException
    {
        public UnauthorizedAccessException(string message) : base(message, null, HttpStatusCode.Unauthorized)
        {
        }
    }
}