using System.Threading.Tasks;
using EquipmentBuilder.API.Data;
using EquipmentBuilder.API.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using EquipmentBuilder.API.Models;
using EquipmentBuilder.API.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace EquipmentBuilder.API.Controllers
{
    [Route("api/[controller]")] //finalnie da api/auth -- cała nazwa do słowa Controller
    [ApiController]
    public class AuthController : ControllerBase
    {
        
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            //nieuwzglenianie case sensitivity przy rejestracji
            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();

            if (await _repo.UserExists(userForRegisterDto.UserName))
                return BadRequest("Użytkownik już istnieje");

            var userToCreate = new Users
            {
                UserName = userForRegisterDto.UserName,      
                Email = userForRegisterDto.Email,
                FirstName = userForRegisterDto.FirstName,
                Surname = userForRegisterDto.Surname,
                DateOfBirth = userForRegisterDto.DateOfBirth
            };



            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            //zwrotka dla klienta gdzie został stworzony nowy obiekt
            //return CreatedAtRoute();
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            //throw new Exception("test - exception was thrown");
            //35 film 
            var userFromRepo = await _repo.Login(userForLoginDto.UserName.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            //stworzenie tokenu dla uzytkownika
            var claims = new[]
            {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }


        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpPost("ModifyUserName")]
        public async Task<IActionResult> ModifyUserName([FromBody] UserToModifyNameDto userToModifyDto)
        {
            //nieuwzglenianie case sensitivity przy rejestracji
            userToModifyDto.UserName = userToModifyDto.UserName.ToLower();

            if (await _repo.UserExists(userToModifyDto.UserName))
                return BadRequest("Użytkownik o takiej nazwie już istnieje");

            var userToCreate = new Users
            {
                UserName = userToModifyDto.UserName              
            };

            var createdUser = await _repo.ModifyUserName(userToModifyDto.UserId,userToModifyDto.UserName);

            //zwrotka dla klienta gdzie został stworzony nowy obiekt
            //return CreatedAtRoute();
            return StatusCode(201);
        }


        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] UserPasswordModify userToModifyDto)
        {
            var createdUser = await _repo.ChangePassword(userToModifyDto);

            return StatusCode(201);
        }
        

    }
}