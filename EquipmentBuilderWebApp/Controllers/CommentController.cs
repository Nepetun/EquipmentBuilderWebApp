using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
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
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _repo;
        //private readonly IConfiguration _config;

        public CommentController(ICommentRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpPost("AddComment")]
        public async Task<IActionResult> AddComment([FromBody] CommentDto comment)
        {
            // jeżeli nie ma ekwipunku
            if (! await _repo.EquipmentExists(comment.EquipmentId))
                return BadRequest("Ekwipunek nie istnieje :C");

            var addComment = await _repo.AddComment(comment.CommentString, comment.EquipmentId, comment.UserId);            

            return StatusCode(201);
        }



        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera  , ActionName("GetSendInvitations")
        [HttpGet("GetCommentsForEquipment")]
        public async Task<IEnumerable<CommentToShowDto>> GetCommentsForEquipment([FromQuery] int equipmentId)
        {

            var comments = await _repo.GetCommentsForEquipment(equipmentId);

            return comments;
        }

        [HttpDelete("DeleteComment")]
        public async Task<bool> DeleteComment([FromBody] int commentId)
        {
            return await _repo.DeleteComment(commentId);
        }
    }
}
