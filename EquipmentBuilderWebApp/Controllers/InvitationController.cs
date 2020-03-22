using EquipmentBuilder.API.Data.Interfaces;
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

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpGet("{userId}"), ActionName("GetRecivedInvitations")]
        public async Task<IEnumerable<Invitations>> GetRecivedInvitations(int userId)
        {

            var myEquipments = await _repo.GetRecieveInvitations(userId);

            return myEquipments;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpGet("{userId}"), ActionName("GetSendInvitations")]
        public async Task<IEnumerable<Invitations>> GetSendInvitations(int userId)
        {

            var myEquipments = await _repo.GetSendedInvitations(userId);

            return myEquipments;
        }
    }
}
