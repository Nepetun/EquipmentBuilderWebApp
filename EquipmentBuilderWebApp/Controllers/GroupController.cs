using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Common.Filters;
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
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _repo;
        //private readonly IConfiguration _config;

        public GroupController(IGroupRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera {userId}
        [HttpPost("CreateGroup")]
        public async Task<IActionResult> CreateGroup([FromBody] GroupDto dtoGroup)
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


       // [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera , ActionName("GetRecivedInvitations")]
        [HttpGet("GetUserGroups")]
        //public async Task<IEnumerable<Groups>> GetUserGroups([FromBody] int userId)  --TAKIE POWINNO BYC i usuneicie userId z linijki wyzej i tak kazdą inna przerobić
        public async Task<PagedList<GroupListDto>> GetUserGroups([FromQuery] PageParams pageParams, [FromQuery] int userId, [FromQuery] GroupFilter filters)
        {

            var userGroups = await _repo.GetUserGroups(pageParams,userId, filters);

            Response.AddPagination(userGroups.CurrentPage, userGroups.PageSize, userGroups.TotalCount, userGroups.TotalPages);

            return userGroups;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera {userId}
        [HttpGet("GetAllUsersWhichNotInGroup")]
        public async Task<PagedList<UserToModifyNameDto>> GetAllUsersWhichNotInGroup([FromQuery] PageParams pageParams, [FromQuery] int groupId, [FromQuery] GroupUsersFilter filters) 
        {
            var usersWhichNotInGroup = await _repo.GetUsersForApplication(pageParams, groupId, filters);

            Response.AddPagination(usersWhichNotInGroup.CurrentPage, usersWhichNotInGroup.PageSize, usersWhichNotInGroup.TotalCount, usersWhichNotInGroup.TotalPages);

            return usersWhichNotInGroup;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera {userId}
        [HttpGet("GetAllUsersFromGroup")]
        public async Task<PagedList<UserToModifyNameDto>> GetAllUsersFromGroup([FromQuery] PageParams pageParams, [FromQuery] int groupId, [FromQuery] GroupUsersFilter filters)
        {
            var usersWhichNotInGroup = await _repo.GetUsersFromGroup(pageParams, groupId, filters);

            Response.AddPagination(usersWhichNotInGroup.CurrentPage, usersWhichNotInGroup.PageSize, usersWhichNotInGroup.TotalCount, usersWhichNotInGroup.TotalPages);

            return usersWhichNotInGroup;
        }


        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpGet("GetGroupById")] //("{userId}")
        public async Task<GroupDto> GetGroupById([FromQuery] int groupId)
        {
            var equipment = await _repo.GetGroupById(groupId);

            return equipment;
        }




        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera {userId}
        [HttpPost("ModyfiyGroup")]
        public async Task<IActionResult> ModifyGroup([FromBody] GroupDto dtoGroup)
        {

            if (await _repo.GroupExists(dtoGroup.GroupName))
                return BadRequest("Grupa już istnieje");

            var groupToModify = new Groups
            {
                GroupAdminId = dtoGroup.UserId,
                GroupName = dtoGroup.GroupName,
                Id = dtoGroup.GroupId
            };

            var modifyGroup = await _repo.ModifyGroup((int)groupToModify.GroupAdminId, groupToModify.GroupName, groupToModify.Id);

            //zwrotka dla klienta gdzie został stworzony nowy obiekt
            //return CreatedAtRoute();
            return StatusCode(201);
        }

        [HttpDelete("DeleteGroup")]
        public async Task<bool> DeleteGroup([FromQuery] int groupId)
        {
            return await _repo.DeleteGroup(groupId);
        }


        [HttpDelete("DeleteUserFromGroup")]
        public async Task<bool> DeleteUserFromGroup([FromQuery] int userId, [FromQuery] int groupId)
        {
            return await _repo.DeleteUserFromGroup(userId,groupId);
        }
    }

}
