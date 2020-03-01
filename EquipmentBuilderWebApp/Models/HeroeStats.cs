using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class HeroeStats
    {
        [Key]
        public int Id { get; set; }
        public int? HeroId { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? HitPoints { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? HitPointsRegen { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? Mana { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? ManaRegen { get; set; }
        public int? Range { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AttackDamage { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AttackSpeed { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? Armour { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? MagicResistance { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? MovementSpeed { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AbilityPower { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? CooldownReduction { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? ArmourPenetration { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? ArmourPenetrationProc { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? MagicPenetration { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? MagicPenetrationProc { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? LifeSteal { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? ApLifeSteal { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? Tenacity { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? CriticalChance { get; set; }

        [ForeignKey(nameof(HeroId))]
        [InverseProperty(nameof(Heroes.HeroeStats))]
        public virtual Heroes Hero { get; set; }
    }
}
