using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class Likes
    {
        [Key]
        public int Id { get; set; }
        public int? EquipmentId { get; set; }
        public int? UserId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Tmstmp { get; set; }

        [ForeignKey(nameof(EquipmentId))]
        [InverseProperty(nameof(Equipments.Likes))]
        public virtual Equipments Equipment { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Users.Likes))]
        public virtual Users User { get; set; }
    }
}
