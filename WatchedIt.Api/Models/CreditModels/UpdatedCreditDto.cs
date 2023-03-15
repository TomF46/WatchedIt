using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Enums;

namespace WatchedIt.Api.Models.CreditModels
{
    public class UpdatedCreditDto
    {
        public string? Role {get;set;}
        public CreditType Type {get;set;}
    }
}