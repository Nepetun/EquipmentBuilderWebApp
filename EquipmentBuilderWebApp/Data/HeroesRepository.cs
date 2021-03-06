﻿using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Common.Filters;
using EquipmentBuilder.API.Context;
// using EquipmentBuilder.API.Context;
using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data
{
    public class HeroesRepository  : IHeroesRepository
    {
        private readonly DataContext _context;

        public HeroesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Heroes> CreateHero(Heroes heroToCreate)
        {
            int id = await _context.Heroes.MaxAsync(x => x.Id);
            heroToCreate.Id = id + 1;
            await _context.Heroes.AddAsync(heroToCreate);
            await _context.SaveChangesAsync();
            return heroToCreate;
        }

        public async Task<HeroeStats> CreateHeroStats(HeroeStats heroStats)
        {
            int id = await _context.HeroeStats.MaxAsync(x => x.Id);
            heroStats.Id = id + 1;
            await _context.HeroeStats.AddAsync(heroStats);
            await _context.SaveChangesAsync();
            return heroStats;
        }

        public async Task<HeroesManagementDto> GetHeroesToModify(int heroId)
        {
            HeroesManagementDto heroToReturn = new HeroesManagementDto();

            Heroes hero = await _context.Heroes.FirstOrDefaultAsync(x => x.Id == heroId);

            HeroeStats heroStats = await _context.HeroeStats.FirstOrDefaultAsync(x => x.HeroId == hero.Id);


            heroToReturn.AbilityPower = heroStats.AbilityPower;
            heroToReturn.ApLifeSteal = heroStats.ApLifeSteal;
            heroToReturn.Armour = heroStats.Armour;
            heroToReturn.ArmourPenetration = heroStats.ArmourPenetration;
            heroToReturn.ArmourPenetrationProc = heroStats.ArmourPenetrationProc;
            heroToReturn.AttackDamage = heroStats.AttackDamage;
            heroToReturn.AttackSpeed = heroStats.AttackSpeed;
            heroToReturn.CooldownReduction = heroStats.CooldownReduction;
            heroToReturn.CriticalChance = heroStats.CriticalChance;
            heroToReturn.HeroName = hero.HeroName;
            heroToReturn.HitPoints = heroStats.HitPoints;
            heroToReturn.HitPointsRegen = heroStats.HitPointsRegen;
            heroToReturn.LifeSteal = heroStats.LifeSteal;
            heroToReturn.MagicPenetration = heroStats.MagicPenetration;
            heroToReturn.MagicPenetrationProc = heroStats.MagicPenetrationProc;
            heroToReturn.MagicResistance = heroStats.MagicResistance;
            heroToReturn.Mana = heroStats.Mana;
            heroToReturn.ManaRegen = heroStats.ManaRegen;
            heroToReturn.MovementSpeed = heroStats.MovementSpeed;
            heroToReturn.Range = heroStats.Range;
            heroToReturn.Tenacity = heroStats.Tenacity;

            return heroToReturn;
        }

        public async Task<IEnumerable<HeroDto>> GetAllHeroes()
        {
            var lstHeroes = await _context.Heroes.ToListAsync();

            var lstItemsFromApi = new List<HeroDto>();

            foreach (Heroes hero in lstHeroes)
            {
                var heroToCreate = new HeroDto();
                heroToCreate.Id = hero.Id;
                heroToCreate.HeroName = hero.HeroName;

                var gameName = await _context.Games.FirstOrDefaultAsync(x => x.Id == hero.GameId);

                heroToCreate.GameName = gameName.GameName;

                lstItemsFromApi.Add(heroToCreate);
            }

            return lstItemsFromApi;
        }

        public async Task<PagedList<HeroDto>> GetHeroesToManagement(PageParams pageParams, HeroesManagementFilter filter)
        {
            List<HeroDto> lstHeroesListed = new List<HeroDto>();
            List<Heroes> lstHeroes = new List<Heroes>();
            lstHeroes = await _context.Heroes.ToListAsync();

            if (filter.HeroNameLike != null)
            {
                lstHeroes = lstHeroes.Where(x => x.HeroName.ToLower().Contains(filter.HeroNameLike.ToLower())).ToList();
            }


            foreach (Heroes heroes in lstHeroes)
            {
                var gameName = await _context.Games.FirstOrDefaultAsync(x => x.Id == heroes.GameId);

               
                HeroDto heroDto = new HeroDto()
                {
                    Id = heroes.Id,
                    HeroName = heroes.HeroName,
                    GameName = gameName.GameName
            };
                lstHeroesListed.Add(heroDto);
            }

            return await PagedList<HeroDto>.Create(lstHeroesListed, pageParams.PageNumber, pageParams.PageSize);
        }

        //public async Task<bool> ModifyHero(Heroes heroToModify)
        //{
        //    var heroToModifyData = await _context.Heroes.FirstOrDefaultAsync(x => x.HeroName == heroToModify.HeroName);


        //    heroToModifyData.HeroName = heroToModify.HeroName;

        //    _context.Heroes.Update(heroToModifyData);

        //    await _context.SaveChangesAsync();

        //    return true;
        //}

        public async Task<bool> ModifyHeroStats(HeroeStats heroStats)
        {
            var heroStatsToModifyData = await _context.HeroeStats.FirstOrDefaultAsync(x => x.HeroId == heroStats.HeroId);


            heroStatsToModifyData.AbilityPower = heroStats.AbilityPower;
            heroStatsToModifyData.ApLifeSteal = heroStats.ApLifeSteal;
            heroStatsToModifyData.Armour = heroStats.Armour;
            heroStatsToModifyData.ArmourPenetration = heroStats.ArmourPenetration;
            heroStatsToModifyData.ArmourPenetrationProc = heroStats.ArmourPenetrationProc;
            heroStatsToModifyData.AttackDamage = heroStats.AttackDamage;
            heroStatsToModifyData.AttackSpeed = heroStats.AttackSpeed;
            heroStatsToModifyData.CooldownReduction = heroStats.CooldownReduction;
            heroStatsToModifyData.CriticalChance = heroStats.CriticalChance;
            heroStatsToModifyData.HitPoints = heroStats.HitPoints;
            heroStatsToModifyData.HitPointsRegen = heroStats.HitPointsRegen;
            heroStatsToModifyData.LifeSteal = heroStats.LifeSteal;
            heroStatsToModifyData.MagicPenetration = heroStats.MagicPenetration;
            heroStatsToModifyData.MagicPenetrationProc = heroStats.MagicPenetrationProc;
            heroStatsToModifyData.MagicResistance = heroStats.MagicResistance;
            heroStatsToModifyData.Mana = heroStats.Mana;
            heroStatsToModifyData.ManaRegen = heroStats.ManaRegen;
            heroStatsToModifyData.MovementSpeed = heroStats.MovementSpeed;
            heroStatsToModifyData.Range = heroStats.Range;
            heroStatsToModifyData.Tenacity = heroStats.Tenacity;


            _context.HeroeStats.Update(heroStatsToModifyData);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ValidateHeroName(string heroName)
        {
            if (await _context.Heroes.AnyAsync(x => x.HeroName == heroName))
                return true;
            else
                return false;
        }

        public async Task<int> GetHeroId(string heroToModify)
        {
            var heroToModifyData = await _context.Heroes.FirstOrDefaultAsync(x => x.HeroName.ToLower() == heroToModify.ToLower());
            return heroToModifyData.Id;
        }
    }
}
