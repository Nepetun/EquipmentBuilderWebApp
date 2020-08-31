using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Common.Filters;
using EquipmentBuilder.API.Context;
using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data
{
    public class HeroesRepository : IHeroesRepository
    {
        private readonly DataContext _context;

        public HeroesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Heroes> CreateHero(Heroes heroToCreate)
        {
            await _context.Heroes.AddAsync(heroToCreate);
            await _context.SaveChangesAsync();
            return heroToCreate;
        }

        public async Task<HeroeStats> CreateHeroStats(HeroeStats heroStats)
        {
            await _context.HeroeStats.AddAsync(heroStats);
            await _context.SaveChangesAsync();
            return heroStats;
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
                HeroDto heroDto = new HeroDto()
                {
                    Id = heroes.Id,
                    HeroName = heroes.HeroName
                };
                lstHeroesListed.Add(heroDto);
            }

            return await PagedList<HeroDto>.Create(lstHeroesListed, pageParams.PageNumber, pageParams.PageSize);
        }

        public async Task<bool> ModifyHero(Heroes heroToModify)
        {
            var heroToModifyData = await _context.Heroes.FirstOrDefaultAsync(x => x.HeroName == heroToModify.HeroName);


            heroToModifyData.HeroName = heroToModify.HeroName;

            _context.Heroes.Update(heroToModifyData);

            await _context.SaveChangesAsync();

            return true;
        }

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
            heroStatsToModifyData.HitPoints= heroStats.HitPoints;
            heroStatsToModifyData.HitPointsRegen = heroStats.HitPointsRegen;
            heroStatsToModifyData.LifeSteal = heroStats.LifeSteal;
            heroStatsToModifyData.MagicPenetration = heroStats.MagicPenetration;
            heroStatsToModifyData.MagicPenetrationProc = heroStats.MagicPenetrationProc;
            heroStatsToModifyData.MagicResistance = heroStats.MagicResistance;
            heroStatsToModifyData.Mana = heroStats.Mana;
            heroStatsToModifyData.ManaRegen = heroStats.ManaRegen;
            heroStatsToModifyData.MovementSpeed = heroStats.MovementSpeed;
            heroStatsToModifyData.Range= heroStats.Range;
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
    }
}
