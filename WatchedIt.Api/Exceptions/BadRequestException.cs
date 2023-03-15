using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace WatchedIt.Api.Exceptions
{
    public class BadRequestException : CustomException
    {
        public BadRequestException(string message, List<string>? errors = default): base(message, errors, HttpStatusCode.BadRequest)
        {
        }
    }
}