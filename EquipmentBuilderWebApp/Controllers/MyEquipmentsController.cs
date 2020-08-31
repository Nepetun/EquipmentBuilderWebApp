using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Common.Filters;
using EquipmentBuilder.API.Context;
using EquipmentBuilder.API.Data;
using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using EquipmentBuilderWebApp.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EquipmentBuilder.API.Controllers
{
    [Route("api/[controller]")] //finalnie da api/auth -- cała nazwa do słowa Controller
    [ApiController] // "mówi" że Metody korzystają z FromBody lub z FromQeury
    public class MyEquipmentsController : ControllerBase //controller base nie wprowadza viewsow- te robimy w angularze
    {
        private readonly IEquipmentRepository _repo;
        private readonly IMapper _mapper;

        public MyEquipmentsController(IEquipmentRepository repo, IMapper mapper) // IMapper mapper;
        {
            _repo = repo;
            _mapper = mapper;
        }


        // Paging
        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpGet("GetEquipments")]
        public async Task<PagedList<EquipmentListDto>> GetEquipments([FromQuery] PageParams pageParams, [FromQuery] int userId, [FromQuery] EquipmentFilter eqFilters, [FromQuery] bool isAdmin)
        {

            var myEquipments = await _repo.ListMyEquipments(pageParams, userId, eqFilters, isAdmin);

            Response.AddPagination(myEquipments.CurrentPage, myEquipments.PageSize, myEquipments.TotalCount, myEquipments.TotalPages);
            return myEquipments;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpGet("GetEquipmentById")] //("{userId}")
        public async Task<EquipmentDto> GetEquipmentById([FromQuery] int equipmentId)
        {

            var equipment = await _repo.GetEquipmentById(equipmentId);
            return equipment;
        }



        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpPost("addEquipment")]
        public async Task<IActionResult> AddEquipment([FromBody] EquipmentDto equipmentDto)
        {
            //nieuwzglenianie case sensitivity 
            equipmentDto.EqName = equipmentDto.EqName.ToLower();

            if (await _repo.ValidateEquipmentName(equipmentDto.EqName, equipmentDto.UserId))
                return BadRequest("Taka nazwa ekwipunku już istnieje");

            var eqToCreate = new Equipments
            {
                EqName = equipmentDto.EqName,
                UserId = equipmentDto.UserId,
                HeroId = equipmentDto.HeroId,
                FirtItemId = equipmentDto.FirtItemId,
                SecondItemId = equipmentDto.SecondItemId,
                ThirdItemId = equipmentDto.ThirdItemId,
                FourthItemId = equipmentDto.FourthItemId,
                FifthItemId = equipmentDto.FifthItemId,
                SixthItemId = equipmentDto.SixthItemId
            };

            var createdEquipment = await _repo.AddEquipment(eqToCreate, equipmentDto.HeroLvl);
            return StatusCode(201);
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpPost("updateEquipment")]//, ActionName("addEquipment")]
        public async Task<IActionResult> UpdateEquipment([FromBody] EquipmentDto equipmentDto)
        {
            //nieuwzglenianie case sensitivity 
            equipmentDto.EqName = equipmentDto.EqName.ToLower();

            if (await _repo.ValidateEquipmentNameForUpdate(equipmentDto.EqName, equipmentDto.UserId, equipmentDto.EquipmentId))
                return BadRequest("Inny z Twoich ekwipunków posiada już taką nazwę");

            var eqToCreate = new Equipments
            {
                EqName = equipmentDto.EqName,
                UserId = equipmentDto.UserId,
                HeroId = equipmentDto.HeroId,
                FirtItemId = equipmentDto.FirtItemId,
                SecondItemId = equipmentDto.SecondItemId,
                ThirdItemId = equipmentDto.ThirdItemId,
                FourthItemId = equipmentDto.FourthItemId,
                FifthItemId = equipmentDto.FifthItemId,
                SixthItemId = equipmentDto.SixthItemId
            };

            var createdEquipment = await _repo.UpdateEquipment(eqToCreate, equipmentDto.HeroLvl, equipmentDto.EquipmentId);
            return StatusCode(201);
        }

        // async Task<IActionResult> 
        [HttpDelete("deleteEquipment")]
        public Task<bool> DeleteEquipment([FromQuery] int equipmentId)
        {
            return _repo.DeleteEquipment(equipmentId);
        }


        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera  ,ActionName("GetSharedEquipments")
        [HttpGet("GetSharedEquipments")]
        public async Task<IEnumerable<SharedEquipmentInformation>> GetSharedEquipments([FromQuery] int userId, [FromQuery] int groupId)
        {
            var sharedEquipments = await _repo.ListSharedEquipments(userId);
            return sharedEquipments;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera  ,ActionName("GetSharedEquipments")
        [HttpPost("ShareEquipment")]
        public async Task<IActionResult> ShareEquipment([FromBody] ShareEquipmentDto eqToShare)
        {
            if (await _repo.CheckThatEqWasShared(eqToShare.EquipmentId, eqToShare.GroupId))
                return BadRequest("Ekwipunek jest już udostpępniony dla tej grupy");

            var eqShare = await _repo.ShareEquipment(eqToShare);

            return StatusCode(201);
        }


        [HttpDelete("deleteShareEquipment")]
        public Task<bool> DeleteShareEquipment([FromQuery] int equipmentId, [FromQuery] int groupId)
        {
            return _repo.DeleteShareEquipment(equipmentId, groupId);
        }
    }
}
