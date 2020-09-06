using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using EquipmentBuilderWebApp.Helpers;
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
    public class InvitationController : ControllerBase
    {
        private readonly IInvitationRepository _repo;
        //private readonly IConfiguration _config;

        public InvitationController(IInvitationRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera , ActionName("GetRecivedInvitations")]
        [HttpGet("GetRecivedInvitations")]
        public async Task<PagedList<InvitationDto>> GetRecivedInvitations([FromQuery] PageParams pageParams, [FromQuery] int userId)
        {

            var myEquipments = await _repo.GetRecieveInvitations(pageParams,userId);
            Response.AddPagination(myEquipments.CurrentPage, myEquipments.PageSize, myEquipments.TotalCount, myEquipments.TotalPages);
            return myEquipments;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera  , ActionName("GetSendInvitations")
        [HttpGet("GetSendInvitations")]
        public async Task<IEnumerable<InvitationDto>> GetSendInvitations([FromQuery] int userId)
        {

            var myEquipments = await _repo.GetSendedInvitations(userId);

            return myEquipments;
        }


        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpPost("SendInvitation")]
        public async Task<IActionResult> SendIvnvitation([FromBody] SendInvitationDto invitation)
        {

            if (await _repo.InvitationWasSend(invitation.UserId, invitation.RecipientUserId, invitation.InvitationGroupId))
                return BadRequest("Zaproszenie zostało już wysłane");

            if (await _repo.UserExistsInGroup(invitation.RecipientUserId, invitation.InvitationGroupId))
                return BadRequest("Użytkownik należy już do grupy");


            var invitationToSend = new Invitations
            {
                GroupId = invitation.InvitationGroupId,
                UserAdresserId = invitation.UserId,
                UserRecipientId = invitation.RecipientUserId
            };



            var sendedInvitation = await _repo.SendInvitation(invitationToSend);

            //zwrotka dla klienta gdzie został stworzony nowy obiekt
            //return CreatedAtRoute();
            return StatusCode(201);
        }


        [HttpPost("AcceptInvitation")]
        public async Task<IActionResult> AcceptInvitation([FromBody] AcceptRejectRepositoryDto accept)
        {
            //osoba akceptująca wpada jako user Id
            var accptedInvitation = await _repo.AcceptInvitation(accept.UserId, accept.InvitationId);

            return StatusCode(201);
        }

        [HttpDelete("RejectInvitation")]
        public async Task<bool> RejectInvitation([FromQuery] int userId, [FromQuery] int InvitationId)
        {
            //osoba odrzucajaca wpada jako user Id
            return await _repo.RejectInvitation(userId, InvitationId);
                   
        }


    }
}
