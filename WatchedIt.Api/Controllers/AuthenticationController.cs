using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Services.AuthenticationService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IConfiguration _config;
        public AuthenticationController(IConfiguration config, IAuthenticationService authenticationService)
        {
            _config = config;
            _authenticationService = authenticationService;
        }

        [HttpPost("login")]
        public IActionResult Authenticate([FromBody] UserLoginDto userLoginDto)
        {
            var user = _authenticationService.Authenticate(userLoginDto.Email, userLoginDto.Password);

            if (user == null)
                throw new BadRequestException("Username or password is incorrect");

            var tokenExpiryTime = DateTime.UtcNow.AddDays(365);
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["AppSettings:AuthSecret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role.ToString())

                }),
                Expires = tokenExpiryTime,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new AuthenticationResponse()
            {
                Id = user.Id,
                Username = user.Username,
                Token = tokenString,
                TokenExpiry = tokenExpiryTime
            });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegistrationDto userDto)
        {
            var user = new User
            {
                Email = userDto.Email,
                Username = userDto.Username,
                ImageUrl = _config["Defaults:ProfileImage"]
            };
            _authenticationService.Create(user, userDto.Password);
            return Ok();
        }
    }
}