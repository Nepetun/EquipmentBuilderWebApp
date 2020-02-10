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
        }

        [Key]
        public int Id { get; set; }
        [StringLength(100)]
        public string HeroName { get; set; }

        [InverseProperty("IdNavigation")]
        public virtual HeroeStats HeroeStats { get; set; }
        [InverseProperty("Hero")]
        public virtual ICollection<Equipments> Equipments { get; set; }
    }
}
