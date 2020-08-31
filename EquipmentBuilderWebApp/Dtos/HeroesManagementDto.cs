using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class HeroesManagementDto
    {
        public HeroesManagementDto()
        {

        }

        public int Id { get; set; }
        public string HeroName { get; set; }

        public decimal? HitPoints { get; set; }
        public decimal? HitPointsRegen { get; set; }
        public decimal? Mana { get; set; }
        public decimal? ManaRegen { get; set; }
        public int? Range { get; set; }
        public decimal? AttackDamage { get; set; }
        public decimal? AttackSpeed { get; set; }
        public decimal? Armour { get; set; }
        public decimal? MagicResistance { get; set; }
        public decimal? MovementSpeed { get; set; }
        public decimal? AbilityPower { get; set; }
        public decimal? CooldownReduction { get; set; }
        public decimal? ArmourPenetration { get; set; }
        public decimal? ArmourPenetrationProc { get; set; }
        public decimal? MagicPenetration { get; set; }
        public decimal? MagicPenetrationProc { get; set; }
        public decimal? LifeSteal { get; set; }
        public decimal? ApLifeSteal { get; set; }
        public decimal? Tenacity { get; set; }
        public decimal? CriticalChance { get; set; }
    }
}
