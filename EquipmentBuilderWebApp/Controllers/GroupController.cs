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
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _repo;
        //private readonly IConfiguration _config;

        public GroupController(IGroupRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpPost("{userId}/CreateGroup")]
        public async Task<IActionResult> CreateGroup(GroupDto dtoGroup)
        {

            if (await _repo.GroupExists(dtoGroup.GroupName))
                return BadRequest("Grupa już istnieje");

            var groupToCreate = new Groups
            {
                GroupAdminId = dtoGroup.UserId,
                GroupName = dtoGroup.GroupName
            };

            var createdGroup = await _repo.CreateGroup(groupToCreate);

            //zwrotka dla klienta gdzie został stworzony nowy obiekt
            //return CreatedAtRoute();
            return StatusCode(201);
        }


        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera , ActionName("GetRecivedInvitations")]
        [HttpGet("{userId}/GetUserGroups")]
        public async Task<IEnumerable<Groups>> GetUserGroups(int userId)
        {

            var userGroups = await _repo.GetUserGroups(userId);

            return userGroups;
        }    

    }

}
