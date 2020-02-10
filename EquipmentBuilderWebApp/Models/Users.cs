using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class Users
    {
        public Users()
        {
            Equipments = new HashSet<Equipments>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(100)]
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public bool? IsAdmin { get; set; }

        [InverseProperty("User")]
        public virtual ICollection<Equipments> Equipments { get; set; }
    }
}
