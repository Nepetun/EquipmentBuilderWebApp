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
    public class HeroesController : ControllerBase
    {
        private readonly IHeroesRepository _repo;

        public HeroesController(IHeroesRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera  , ActionName("GetSendInvitations")
        [HttpGet("GetAllHeroes")]
        public async Task<IEnumerable<HeroDto>> GetAllHeroes()
        {

            var heroes = await _repo.GetAllHeroes();

            return heroes;
        }

        [HttpGet("GetHeroesToManagement")]
        public async Task<IEnumerable<HeroDto>> GetHeroesToManagement([FromQuery] PageParams pageParams, [FromQuery] HeroesManagementFilter filter)
        {
            var heroes = await _repo.GetHeroesToManagement(pageParams, filter);
            Response.AddPagination(heroes.CurrentPage, heroes.PageSize, heroes.TotalCount, heroes.TotalPages);
            return heroes;
        }



        [HttpGet("GetHeroesToModify")]
        public async Task<HeroesManagementDto> GetHeroesToModify([FromQuery] int heroId)
        {
            var heroes = await _repo.GetHeroesToModify(heroId);
            return heroes;
        }

        [HttpPost("AddHeroes")]
        public async Task<IActionResult> AddHeroes([FromBody] HeroesManagementDto hero)
        {
            //nieuwzglenianie case sensitivity 
            hero.HeroName = hero.HeroName.ToLower();

            // sprawdzenie czy taki bohater juz istnieje
            if (await _repo.ValidateHeroName(hero.HeroName))
                return BadRequest("Taka nazwa bohatera już istnieje");

           // dodanie bohatera
            var heroToCreate = new Heroes
            {
                HeroName = hero.HeroName,
                GameId = hero.GameId
            };

            var createdHero = await _repo.CreateHero(heroToCreate);


           // dodanie statystyk bohatera
           var heroStats = new HeroeStats
           {
               AbilityPower = hero.AbilityPower,
               ApLifeSteal = hero.ApLifeSteal,
               Armour = hero.Armour,
               ArmourPenetration = hero.ArmourPenetration,
               ArmourPenetrationProc = hero.ArmourPenetrationProc,
               AttackDamage = hero.AttackDamage,
               AttackSpeed = hero.AttackSpeed,
               CooldownReduction = hero.CooldownReduction,
               CriticalChance = hero.CriticalChance,
               HitPoints = hero.HitPoints,
               HitPointsRegen = hero.HitPointsRegen,
               LifeSteal = hero.LifeSteal,
               MagicPenetration = hero.MagicPenetration,
               MagicPenetrationProc = hero.MagicPenetrationProc,
               MagicResistance = hero.MagicResistance,
               Mana = hero.Mana,
               ManaRegen = hero.ManaRegen,
               MovementSpeed = hero.MovementSpeed,
               Range = hero.Range,
               Tenacity = hero.Tenacity,
               HeroId = heroToCreate.Id
           };

            var createdItemStats = await _repo.CreateHeroStats(heroStats);
            return StatusCode(201);
        }

        [HttpPost("ModifyHeroes")]
        public async Task<IActionResult> ModifyHeroes([FromBody] HeroesManagementDto hero)
        {
            //nieuwzglenianie case sensitivity 
            hero.HeroName = hero.HeroName.ToLower();


            var heroIdFromDB = await _repo.GetHeroId(hero.HeroName);


            // dodanie statystyk bohatera 
            var heroStats = new HeroeStats
            {
                AbilityPower = hero.AbilityPower,
                ApLifeSteal = hero.ApLifeSteal,
                Armour = hero.Armour,
                ArmourPenetration = hero.ArmourPenetration,
                ArmourPenetrationProc = hero.ArmourPenetrationProc,
                AttackDamage = hero.AttackDamage,
                AttackSpeed = hero.AttackSpeed,
                CooldownReduction = hero.CooldownReduction,
                CriticalChance = hero.CriticalChance,
                HitPoints = hero.HitPoints,
                HitPointsRegen = hero.HitPointsRegen,
                LifeSteal = hero.LifeSteal,
                MagicPenetration = hero.MagicPenetration,
                MagicPenetrationProc = hero.MagicPenetrationProc,
                MagicResistance = hero.MagicResistance,
                Mana = hero.Mana,
                ManaRegen = hero.ManaRegen,
                MovementSpeed = hero.MovementSpeed,
                Range = hero.Range,
                Tenacity = hero.Tenacity,
                HeroId = heroIdFromDB
            };

            var createdItemStats = await _repo.ModifyHeroStats(heroStats);
            return StatusCode(201);
        }
    }
}
