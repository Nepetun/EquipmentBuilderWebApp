using EquipmentBuilder.API.Context;
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
    public class StatisticsRepository : IStatisticsRepository
    {
        private readonly DataContext _context;
        public StatisticsRepository(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// metoda wylicza statystyki dla bohatera oraz jego ekwipunku
        /// </summary>
        /// <param name="hero"></param>
        /// <param name="eqDto"></param>
        /// <returns></returns>
        public async Task<StatisticsDto> CalculateStats(EquipmentStatisticDto eqDto)
        {
            StatisticsDto statisticsDto = new StatisticsDto();

            HeroeStats heroStats = await _context.HeroeStats.FirstOrDefaultAsync(x => x.Id == eqDto.HeroId);

            //współczynnik podnoszenia statystyk dla kolejnego poziomu bohatera - powstała na potrzeby aplikacji 10%
            decimal factorLvl = 0.1M;

            if(heroStats != null)
            {
                //ustawienie statystyk bohatera 
                statisticsDto.HitPoints = heroStats.HitPoints.HasValue ? (decimal)heroStats.HitPoints + ((decimal)heroStats.HitPoints * factorLvl * eqDto.HeroLvl) : 0;
                statisticsDto.HitPointsRegen = heroStats.HitPointsRegen.HasValue ? (decimal)heroStats.HitPointsRegen + ((decimal)heroStats.HitPointsRegen * factorLvl * eqDto.HeroLvl) : 0;
                statisticsDto.Mana = heroStats.Mana.HasValue? (decimal)heroStats.Mana + ((decimal)heroStats.Mana * factorLvl * eqDto.HeroLvl) : 0;
                statisticsDto.ManaRegen = heroStats.ManaRegen.HasValue? (decimal)heroStats.ManaRegen + ((decimal)heroStats.ManaRegen * factorLvl * eqDto.HeroLvl) : 0;
                statisticsDto.Range = heroStats.Range.HasValue? (int)heroStats.Range : 0; //zasięg pozostaje bez zmian !
                statisticsDto.AttackDamage = heroStats.AttackDamage.HasValue? (decimal)heroStats.AttackDamage + ((decimal)heroStats.AttackDamage * factorLvl * eqDto.HeroLvl) : 0;
                statisticsDto.AttackSpeed = heroStats.AttackSpeed.HasValue? (decimal)heroStats.AttackSpeed + ((decimal)heroStats.AttackSpeed * factorLvl * eqDto.HeroLvl) : 0;
                statisticsDto.Armour = heroStats.Armour.HasValue? (decimal)heroStats.Armour + ((decimal)heroStats.Armour * factorLvl * eqDto.HeroLvl) : 0;
                statisticsDto.MagicResistance = heroStats.MagicResistance.HasValue? (decimal)heroStats.MagicResistance + ((decimal)heroStats.MagicResistance * factorLvl * eqDto.HeroLvl) : 0;
                statisticsDto.MovementSpeed = heroStats.MovementSpeed.HasValue? (decimal)heroStats.MovementSpeed + ((decimal)heroStats.MovementSpeed * factorLvl * eqDto.HeroLvl) : 0;
                statisticsDto.AbillityPower = heroStats.AbilityPower.HasValue? (decimal)heroStats.AbilityPower + ((decimal)heroStats.MovementSpeed * factorLvl * eqDto.HeroLvl) : 0;
                statisticsDto.CooldownReduction = heroStats.CooldownReduction.HasValue? (decimal)heroStats.CooldownReduction + ((decimal)heroStats.CooldownReduction * factorLvl * eqDto.HeroLvl) : 0; 
                statisticsDto.ArmourPenetration = heroStats.ArmourPenetration.HasValue? (decimal)heroStats.ArmourPenetration + ((decimal)heroStats.ArmourPenetration * factorLvl * eqDto.HeroLvl) : 0; 
                statisticsDto.ArmourPenetrationProc = heroStats.ArmourPenetrationProc.HasValue? (decimal)heroStats.ArmourPenetrationProc + ((decimal)heroStats.ArmourPenetrationProc * factorLvl * eqDto.HeroLvl) : 0; 
                statisticsDto.MagicPenetration = heroStats.MagicPenetration.HasValue? (decimal)heroStats.MagicPenetration + ((decimal)heroStats.MagicPenetration * factorLvl * eqDto.HeroLvl) : 0; 
                statisticsDto.MagicPenetrationProc = heroStats.MagicPenetrationProc.HasValue? (decimal)heroStats.MagicPenetrationProc + ((decimal)heroStats.MagicPenetrationProc * factorLvl * eqDto.HeroLvl) : 0; 
                statisticsDto.LifeSteal = heroStats.LifeSteal.HasValue? (decimal)heroStats.LifeSteal + ((decimal)heroStats.LifeSteal * factorLvl * eqDto.HeroLvl) : 0;
                statisticsDto.ApLifeSteal = heroStats.ApLifeSteal.HasValue? (decimal)heroStats.ApLifeSteal + ((decimal)heroStats.ApLifeSteal * factorLvl * eqDto.HeroLvl) : 0; // wampiryzm zaklęć
                statisticsDto.Tenacity = heroStats.Tenacity.HasValue? (decimal)heroStats.Tenacity + ((decimal)heroStats.Tenacity * factorLvl * eqDto.HeroLvl) : 0; // nieustępliwość
                statisticsDto.CriticalChance = heroStats.CriticalChance.HasValue? (decimal)heroStats.CriticalChance + ((decimal)heroStats.CriticalChance * factorLvl * eqDto.HeroLvl) : 0;

                statisticsDto.TotalCost = 0; // ustawienie ceny początkowej

                // lista statystyk przedmiotów
                List<ItemStats> lstStats = new List<ItemStats>();

                // pobranie statystyk przedmiotów
                if(eqDto.FirtItemId != null)
                {
                    ItemStats itemStat = await _context.ItemStats.FirstOrDefaultAsync(x => x.ItemId == eqDto.FirtItemId);
                    lstStats.Add(itemStat);
                }
                if (eqDto.SecondItemId != null)
                {
                    ItemStats itemStat = await _context.ItemStats.FirstOrDefaultAsync(x => x.ItemId == eqDto.SecondItemId);
                    lstStats.Add(itemStat);
                }
                if (eqDto.ThirdItemId != null)
                {
                    ItemStats itemStat = await _context.ItemStats.FirstOrDefaultAsync(x => x.ItemId == eqDto.ThirdItemId);
                    lstStats.Add(itemStat);
                }
                if (eqDto.FourthItemId != null)
                {
                    ItemStats itemStat = await _context.ItemStats.FirstOrDefaultAsync(x => x.ItemId == eqDto.FourthItemId);
                    lstStats.Add(itemStat);
                }
                if (eqDto.FifthItemId != null)
                {
                    ItemStats itemStat = await _context.ItemStats.FirstOrDefaultAsync(x => x.ItemId == eqDto.FifthItemId);
                    lstStats.Add(itemStat);
                }
                if (eqDto.SixthItemId != null)
                {
                    ItemStats itemStat = await _context.ItemStats.FirstOrDefaultAsync(x => x.ItemId == eqDto.SixthItemId);
                    lstStats.Add(itemStat);
                }

                // dodanie statystyk przedmiotów do statystyk bohatera
                foreach(ItemStats itemStat in lstStats)
                {
                    statisticsDto.HitPoints += itemStat.AdditionalHp.HasValue? (decimal)itemStat.AdditionalHp : 0;
                    statisticsDto.HitPointsRegen += itemStat.AdditionalBasicHpRegenPercentage.HasValue? (statisticsDto.HitPointsRegen * (decimal)itemStat.AdditionalBasicHpRegenPercentage) : 0;
                    statisticsDto.Mana += itemStat.AdditionalMana.HasValue? (decimal)itemStat.AdditionalMana : 0;
                    statisticsDto.ManaRegen += (itemStat.AdditionalManaRegen.HasValue? (decimal)itemStat.AdditionalManaRegen : 0) + (itemStat.AdditionalBasicManaRegenPercentage.HasValue? (statisticsDto.ManaRegen * (decimal)itemStat.AdditionalBasicManaRegenPercentage) : 0);
                    statisticsDto.AttackDamage += itemStat.AdditionalDmg.HasValue? (decimal)itemStat.AdditionalDmg : 0;
                    statisticsDto.AttackSpeed += itemStat.AdditionalAttackSpeed.HasValue? (decimal)itemStat.AdditionalAttackSpeed : 0;
                    statisticsDto.Armour += itemStat.AdditionalArmour.HasValue? (decimal)itemStat.AdditionalArmour : 0;
                    statisticsDto.MagicResistance += itemStat.AdditionalMagicResist.HasValue? (decimal)itemStat.AdditionalMagicResist : 0;
                    statisticsDto.MovementSpeed += itemStat.AdditionalMovementSpeed.HasValue? (decimal)itemStat.AdditionalMovementSpeed : 0;
                    statisticsDto.AbillityPower += itemStat.AdditionalAp.HasValue? (decimal)itemStat.AdditionalAp : 0;
                    statisticsDto.CooldownReduction += itemStat.AdditionalCooldownReduction.HasValue? (decimal)itemStat.AdditionalCooldownReduction : 0;
                    statisticsDto.LifeSteal += itemStat.AdditionalLifeSteal.HasValue? (decimal)itemStat.AdditionalLifeSteal : 0;
                    statisticsDto.CriticalChance += itemStat.AdditionalCriticalChance.HasValue? (decimal)itemStat.AdditionalCriticalChance : 0;
                    statisticsDto.AdditionalPotionPower += itemStat.AdditionalPotionPower.HasValue? (decimal)itemStat.AdditionalPotionPower : 0;
                    statisticsDto.AdditionalHitPointsPerHit += itemStat.AdditionalHitPointsPerHit.HasValue? (decimal)itemStat.AdditionalHitPointsPerHit : 0;
                    statisticsDto.AdditionalGoldPerTenSec += itemStat.AdditionalGoldPerTenSec.HasValue? (decimal)itemStat.AdditionalGoldPerTenSec : 0;
                    statisticsDto.Description += "\n"+ itemStat.Descriptions;
                    statisticsDto.TotalCost += itemStat.Price.HasValue? (decimal)itemStat.Price : 0;
                }
            }

            return statisticsDto;
        }

    }
}
