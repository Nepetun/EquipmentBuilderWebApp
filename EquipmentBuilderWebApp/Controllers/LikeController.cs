using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Controllers
{
    [Route("api/[controller]")] //finalnie da api/auth -- cała nazwa do słowa Controller
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly ILikeRepository _repo;
        //private readonly IConfiguration _config;

        public LikeController(ILikeRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpPost("AddLike")]
        public async Task<IActionResult> AddLike([FromBody] LikeDto like)
        {
            // jeżeli nie ma ekwipunku
            if (!await _repo.EquipmentExists(like.EquipmentId))
                return BadRequest("Ekwipunek nie istnieje :C");
                        

            var addComment = await _repo.AddLike(like.EquipmentId, like.UserId);

            return StatusCode(201);
        }



        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera  , ActionName("GetSendInvitations")
        [HttpGet("GetCountOfLike")]
        public async Task<int> GetCountOfLike([FromQuery] int equipmentId)
        {

            var likeCount = await _repo.GetCountOfLike(equipmentId);

            return likeCount;
        }

        [HttpDelete("DeleteLike")]
        public async Task<bool> DeleteLike([FromQuery] LikeDto like)
        {
            return await _repo.RemoveLike(like.EquipmentId,like.UserId);
        }
    }
}
