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
    public class InvitationController : ControllerBase
    {
        private readonly IInvitationRepository _repo;
        //private readonly IConfiguration _config;

        public InvitationController(IInvitationRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera , ActionName("GetRecivedInvitations")]
        [HttpGet("{userId}")]
        public async Task<IEnumerable<Invitations>> GetRecivedInvitations(int userId)
        {

            var myEquipments = await _repo.GetRecieveInvitations(userId);

            return myEquipments;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera  , ActionName("GetSendInvitations")
        [HttpGet("{userId}/GetSendInvitations")]
        public async Task<IEnumerable<Invitations>> GetSendInvitations(int userId)
        {

            var myEquipments = await _repo.GetSendedInvitations(userId);

            return myEquipments;
        }


        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpPost("{userId}/SendInvitation")]
        public async Task<IActionResult> SendIvnvitation(SendInvitationDto invitation)
        {

            if (await _repo.InvitationWasSend(invitation.UserId, invitation.RecipientUserId, invitation.InvitationGroupId))
                return BadRequest("Zaproszenie zostało już wysłane");
            

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


        /// TODO do zrobienia : 1) Akceptowanie zaproszeń + odrzucanie zaproszeń

    }
}
