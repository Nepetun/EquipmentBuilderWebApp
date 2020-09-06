using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using EquipmentBuilderWebApp.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Controllers
{
    [Route("api/[controller]")] //finalnie da api/auth -- cała nazwa do słowa Controller
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IGameRepository _repo;
        //private readonly IConfiguration _config;

        public GamesController(IGameRepository repo)
        {
            _repo = repo;
        }


        [HttpGet("GetGames")]
        public async Task<PagedList<Games>> GetGames([FromQuery] PageParams pageParams)
        {

            var games = await _repo.GetGames(pageParams);

            Response.AddPagination(games.CurrentPage, games.PageSize, games.TotalCount, games.TotalPages);

            return games;
        }
       
        [HttpPost("CreateGame")]
        public async Task<IActionResult> CreateGame([FromBody] GameListDto dtoGame)
        {

            if (await _repo.GameExists(dtoGame.GameName))
                return BadRequest("Gra już istnieje");

            Games game = new Games()
            {
                GameName = dtoGame.GameName
            };
  
            var createdGame = await _repo.CreateGame(game);

            return StatusCode(201);
        }


    }
}
