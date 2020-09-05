using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class ItemsManagementDto
    {
        public ItemsManagementDto()
        {

        }
        public int Id { get; set; }

        public string ItemName { get; set; }
        public int MinHeroLvl { get; set; }

        public decimal? Price { get; set; }
       
        public decimal? AdditionalHp { get; set; }
  
        public decimal? AdditionalDmg { get; set; }

        public decimal? AdditionalLifeSteal { get; set; }

        public decimal? AdditionalAp { get; set; }

        public decimal? AdditionalManaRegen { get; set; }

        public decimal? AdditionalPotionPower { get; set; }

        public decimal? AdditionalHitPointsPerHit { get; set; }

        public decimal? AdditionalGoldPerTenSec { get; set; }

        public decimal? AdditionalBasicManaRegenPercentage { get; set; }

        public decimal? AdditionalBasicHpRegenPercentage { get; set; }

        public decimal? AdditionalArmour { get; set; }

        public decimal? AdditionalMana { get; set; }

        public decimal? AdditionalMagicResist { get; set; }

        public decimal? AdditionalCooldownReduction { get; set; }

        public decimal? AdditionalAttackSpeed { get; set; }

        public decimal? AdditionalMovementSpeed { get; set; }

        public decimal? AdditionalCriticalChance { get; set; }

        public string Descriptions { get; set; }

    }
}
