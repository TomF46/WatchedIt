using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.Configuration
{
    public class ImagesConfiguration
    {
        public bool UseS3 {get; set;}
        public string DiskRootUrl {get; set;}
        public ImageDefaults Defaults {get; set;}
    }

    public class ImageDefaults
    {
        public string ProfileImage {get; set;}
    }
}