using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class Games
    {
        public Games()
        {
            Equipments = new HashSet<Equipments>();
            Heroes = new HashSet<Heroes>();
            Items = new HashSet<Items>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string GameName { get; set; }

        [InverseProperty("Game")]
        public virtual ICollection<Equipments> Equipments { get; set; }
        [InverseProperty("Game")]
        public virtual ICollection<Heroes> Heroes { get; set; }
        [InverseProperty("Game")]
        public virtual ICollection<Items> Items { get; set; }
    }
}
