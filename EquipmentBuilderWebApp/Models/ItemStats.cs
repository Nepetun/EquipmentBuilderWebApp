using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class ItemStats
    {
        [Key]
        public int Id { get; set; }
        public int? ItemId { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? Price { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalHp { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalDmg { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalLifeSteal { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalAp { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalManaRegen { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalPotionPower { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalHitPointsPerHit { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalGoldPerTenSec { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalBasicManaRegenPercentage { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalBasicHpRegenPercentage { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalArmour { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalMana { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalMagicResist { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalCooldownReduction { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalAttackSpeed { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalMovementSpeed { get; set; }
        [Column(TypeName = "decimal(6, 1)")]
        public decimal? AdditionalCriticalChance { get; set; }
        [StringLength(5000)]
        public string Descriptions { get; set; }

        [ForeignKey(nameof(Id))]
        [InverseProperty(nameof(Items.ItemStats))]
        public virtual Items IdNavigation { get; set; }
    }
}
