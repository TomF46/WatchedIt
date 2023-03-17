using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CreditModels;

namespace WatchedIt.Api.Services.Mapping
{
    public class CreditMapper
    {
        public static GetCreditDto map(Credit credit){
            return new GetCreditDto {
                Id = credit.Id,
                Film = FilmMapper.MapSimple(credit.Film),
                Person = PersonMapper.MapSimple(credit.Person),
                Role = credit.Role,
                Type = credit.Type
            };
        }

        public static GetCreditForPersonDto mapForPerson(Credit credit){
            return new GetCreditForPersonDto {
                Id = credit.Id,
                Film = FilmMapper.MapSimple(credit.Film),
                Role = credit.Role,
                Type = credit.Type
            };
        }

        public static GetCreditForFilmDto mapForFilm(Credit credit){
            return new GetCreditForFilmDto {
                Id = credit.Id,
                Person = PersonMapper.MapSimple(credit.Person),
                Role = credit.Role,
                Type = credit.Type
            };
        }
    }
}