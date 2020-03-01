using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class UserHeroesLvl
    {
        [Key]
        public int Id { get; set; }
        public int? HeroId { get; set; }
        public int? UserId { get; set; }
        public int? Lvl { get; set; }

        [ForeignKey(nameof(HeroId))]
        [InverseProperty(nameof(Heroes.UserHeroesLvl))]
        public virtual Heroes Hero { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Users.UserHeroesLvl))]
        public virtual Users User { get; set; }
    }
}
