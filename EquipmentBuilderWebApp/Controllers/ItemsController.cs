using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemsRepository _repo;
        //private readonly IConfiguration _config;

        public ItemsController(IItemsRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpGet("GetItems")] 
        public async Task<IEnumerable<ItemsDto>> GetItems()
        {
            var items = await _repo.GetAllItems();

            return items;
        }

        [HttpGet("GetItemsToManagement")]
        public async Task<IEnumerable<ItemsDto>> GetItemsToManagement([FromQuery] PageParams pageParams, [FromQuery] ItemManagementFilter filter)
        {
            var items = await _repo.GetItemsToManagement(pageParams, filter);
            Response.AddPagination(items.CurrentPage, items.PageSize, items.TotalCount, items.TotalPages);
            return items;
        }

        [HttpDelete("deleteItem")]
        public Task<bool> DeleteItem([FromQuery] int itemId)
        {
            return _repo.DeleteItem(itemId);
        }

        [HttpPost("AddItem")]
        public async Task<IActionResult> AddItem([FromBody] ItemsManagementDto item)
        {
            //nieuwzglenianie case sensitivity 
            item.ItemName = item.ItemName.ToLower();

            // sprawdzenie czy taki przedmiot juz istnieje
            if (await _repo.ValidateItemName(item.ItemName))
                return BadRequest("Taka nazwa przedmiotu już istnieje");

            // dodanie itemu
            var itemToCreate = new Items
            {
                ItemName = item.ItemName,
                MinHeroLvl = item.MinHeroLvl
            };

            var createdItem = await _repo.CreateItem(itemToCreate);


            // dodanie statystyk przedmiotu 
            var itemStats = new ItemStats
            {
                AdditionalAp = item.AbillityPower,
                AdditionalArmour = item.Armour,
                AdditionalAttackSpeed = item.AttackSpeed,
                AdditionalHitPointsPerHit = item.AdditionalHitPointsPerHit,
                AdditionalCooldownReduction = item.CooldownReduction,
                AdditionalCriticalChance = item.CriticalChance,
                AdditionalDmg = item.AttackDamage,
                AdditionalGoldPerTenSec = item.AdditionalGoldPerTenSec,
                AdditionalHp = item.HitPoints,
                AdditionalLifeSteal = item.LifeSteal,
                AdditionalMagicResist = item.MagicResistance,
                AdditionalMana = item.Mana,
                AdditionalManaRegen = item.ManaRegen,
                AdditionalMovementSpeed = item.MovementSpeed,
                AdditionalPotionPower = item.AdditionalPotionPower,
                Descriptions = item.Description,
                ItemId = itemToCreate.Id
            };

            var createdItemStats = await _repo.CreateItemStats(itemStats);
            return StatusCode(201);
        }



        [HttpPost("UpdateItem")]
        public async Task<IActionResult> UpdateItem([FromBody] ItemsManagementDto item)
        {
            //nieuwzglenianie case sensitivity 
            item.ItemName = item.ItemName.ToLower();

            // sprawdzenie czy taki przedmiot juz istnieje
            if (await _repo.ValidateItemName(item.ItemName))
                return BadRequest("Taka nazwa przedmiotu już istnieje");

            // dodanie itemu
            var itemToModify = new Items
            {
                ItemName = item.ItemName,
                MinHeroLvl = item.MinHeroLvl
            };

            var createdItem = await _repo.ModifyItem(itemToModify);


            // dodanie statystyk przedmiotu 
            var itemStats = new ItemStats
            {
                AdditionalAp = item.AbillityPower,
                AdditionalArmour = item.Armour,
                AdditionalAttackSpeed = item.AttackSpeed,
                AdditionalHitPointsPerHit = item.AdditionalHitPointsPerHit,
                AdditionalCooldownReduction = item.CooldownReduction,
                AdditionalCriticalChance = item.CriticalChance,
                AdditionalDmg = item.AttackDamage,
                AdditionalGoldPerTenSec = item.AdditionalGoldPerTenSec,
                AdditionalHp = item.HitPoints,
                AdditionalLifeSteal = item.LifeSteal,
                AdditionalMagicResist = item.MagicResistance,
                AdditionalMana = item.Mana,
                AdditionalManaRegen = item.ManaRegen,
                AdditionalMovementSpeed = item.MovementSpeed,
                AdditionalPotionPower = item.AdditionalPotionPower,
                Descriptions = item.Description,
                ItemId = itemToModify.Id
            };

            var createdItemStats = await _repo.ModifyItemStats(itemStats);
            return StatusCode(201);
        }
    }
}
