using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class Heroes
    {
        public Heroes()
        {
            Equipments = new HashSet<Equipments>();
            HeroeStats = new HashSet<HeroeStats>();
            UserHeroesLvl = new HashSet<UserHeroesLvl>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(100)]
        public string HeroName { get; set; }
        public int? GameId { get; set; }

        [ForeignKey(nameof(GameId))]
        [InverseProperty(nameof(Games.Heroes))]
        public virtual Games Game { get; set; }
        [InverseProperty("Hero")]
        public virtual ICollection<Equipments> Equipments { get; set; }
        [InverseProperty("Hero")]
        public virtual ICollection<HeroeStats> HeroeStats { get; set; }
        [InverseProperty("Hero")]
        public virtual ICollection<UserHeroesLvl> UserHeroesLvl { get; set; }
    }
}
