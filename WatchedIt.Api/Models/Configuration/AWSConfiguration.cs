using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.Configuration
{
    public class AWSConfiguration
    {
        public string Profile {get; set;}
        public string Region {get; set;}
        public string BucketName {get; set;}
    }
}