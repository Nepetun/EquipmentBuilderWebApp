using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Common.Filters;
// using EquipmentBuilder.API.Context;
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
                MinHeroLvl = item.MinHeroLvl,
                GameId = item.GameId
            };

            var createdItem = await _repo.CreateItem(itemToCreate);


            // dodanie statystyk przedmiotu 
            var itemStats = new ItemStats
            {
                ItemId = itemToCreate.Id,
                AdditionalHp = item.AdditionalHp,
                AdditionalDmg = item.AdditionalDmg,
                Price = item.Price,
                AdditionalLifeSteal = item.AdditionalLifeSteal,
                AdditionalAp = item.AdditionalAp,
                AdditionalManaRegen = item.AdditionalManaRegen,
                AdditionalPotionPower = item.AdditionalPotionPower,
                AdditionalHitPointsPerHit = item.AdditionalHitPointsPerHit,
                AdditionalGoldPerTenSec = item.AdditionalGoldPerTenSec,
                AdditionalBasicManaRegenPercentage = item.AdditionalBasicManaRegenPercentage,
                AdditionalBasicHpRegenPercentage = item.AdditionalBasicHpRegenPercentage,
                AdditionalArmour = item.AdditionalArmour,
                AdditionalMana = item.AdditionalMana,
                AdditionalMagicResist = item.AdditionalMagicResist,
                AdditionalCooldownReduction = item.AdditionalCooldownReduction,
                AdditionalAttackSpeed = item.AdditionalAttackSpeed,
                AdditionalMovementSpeed = item.AdditionalMovementSpeed,
                AdditionalCriticalChance = item.AdditionalCriticalChance,
                Descriptions = item.Descriptions
            };


            var createdItemStats = await _repo.CreateItemStats(itemStats);
            return StatusCode(201);
        }



        [HttpPost("UpdateItem")]
        public async Task<IActionResult> UpdateItem([FromBody] ItemsManagementDto item)
        {
            //nieuwzglenianie case sensitivity 
            item.ItemName = item.ItemName.ToLower();

            var itemId = await _repo.GetItemId(item.ItemName);


            // dodanie statystyk przedmiotu 
            var itemStats = new ItemStats
            {
                AdditionalHp = item.AdditionalHp,
                AdditionalDmg = item.AdditionalDmg,
                Price = item.Price,
                AdditionalLifeSteal = item.AdditionalLifeSteal,
                AdditionalAp = item.AdditionalAp,
                AdditionalManaRegen = item.AdditionalManaRegen,
                AdditionalPotionPower = item.AdditionalPotionPower,
                AdditionalHitPointsPerHit = item.AdditionalHitPointsPerHit,
                AdditionalGoldPerTenSec = item.AdditionalGoldPerTenSec,
                AdditionalBasicManaRegenPercentage = item.AdditionalBasicManaRegenPercentage,
                AdditionalBasicHpRegenPercentage = item.AdditionalBasicHpRegenPercentage,
                AdditionalArmour = item.AdditionalArmour,
                AdditionalMana = item.AdditionalMana,
                AdditionalMagicResist = item.AdditionalMagicResist,
                AdditionalCooldownReduction = item.AdditionalCooldownReduction,
                AdditionalAttackSpeed = item.AdditionalAttackSpeed,
                AdditionalMovementSpeed = item.AdditionalMovementSpeed,
                AdditionalCriticalChance = item.AdditionalCriticalChance,
                Descriptions = item.Descriptions,
                ItemId = itemId
            };

            var createdItemStats = await _repo.ModifyItemStats(itemStats);
            return StatusCode(201);
        }



        [HttpGet("GetItemToModify")]
        public async Task<ItemsManagementDto> GetItemToModify([FromQuery] int itemId)
        {
            var item = await _repo.GetItemToModify(itemId);
            return item;
        }
    }
}
