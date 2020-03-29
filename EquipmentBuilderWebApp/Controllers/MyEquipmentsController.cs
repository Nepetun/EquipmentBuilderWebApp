﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EquipmentBuilder.API.Context;
using EquipmentBuilder.API.Data;
using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EquipmentBuilder.API.Controllers
{
    [Route("api/[controller]")] //finalnie da api/auth -- cała nazwa do słowa Controller
    [ApiController]
    public class MyEquipmentsController : ControllerBase //controller base nie wprowadza viewsow- te robimy w angularze
    {
        private readonly IEquipmentRepository _repo;
        //private readonly IConfiguration _config;

        public MyEquipmentsController(IEquipmentRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpGet("{userId}")]
        public async Task<IEnumerable<Equipments>> GetEquipments(int userId)
        {

            var myEquipments = await _repo.ListMyEquipments(userId);

            return myEquipments;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpPost("addEquipment")]//, ActionName("addEquipment")]
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

            var createdEquipment = await _repo.AddEquipment(eqToCreate);//,equipmentDto.UserId);

            //var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            //zwrotka dla klienta gdzie został stworzony nowy obiekt
            //return CreatedAtRoute();
            return StatusCode(201);
        }

        // async Task<IActionResult> 
        [HttpDelete("deleteEquipment")]  
        public string DeleteEquipment([FromBody] int equipmentId)
        {
            //await _repo.DeleteEquipment(equipmentId);
            return _repo.DeleteEquipment(equipmentId);

            //return StatusCode(201);
        }


        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera  ,ActionName("GetSharedEquipments")
        [HttpGet("{userId}/GetSharedEquipments")]
        public async Task<IEnumerable<Equipments>> GetSharedEquipments(int userId)
        {
            // if (await _repo.CheckThatUserHaveGroupsAndSharedEquipments(userId))
            //   return BadRequest("Użytkownik nie posiada udostępnionych ekwpiunków");

            var sharedEquipments = await _repo.ListSharedEquipments(userId);

            return sharedEquipments;
        }


    }
}
