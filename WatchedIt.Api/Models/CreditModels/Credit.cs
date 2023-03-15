using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Models.CreditModels
{
    public class Credit
    {
        public int Id {get;set;}
        public int FilmId {get;set;}
        [Required]
        public Film? Film {get;set;}
        public int PersonId {get;set;}
        [Required]
        public Person? Person {get;set;}
        [StringLength(60, ErrorMessage = "Role name can't be longer than 60 characters.")]
        public string? Role {get;set;}
        [Required]
        public CreditType Type {get;set;}
    }
}