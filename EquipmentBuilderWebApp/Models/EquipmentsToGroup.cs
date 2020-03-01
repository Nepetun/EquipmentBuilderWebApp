using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class EquipmentsToGroup
    {
        [Key]
        public int Id { get; set; }
        public int? EquipmentId { get; set; }
        public int? GroupId { get; set; }

        [ForeignKey(nameof(EquipmentId))]
        [InverseProperty(nameof(Equipments.EquipmentsToGroup))]
        public virtual Equipments Equipment { get; set; }
        [ForeignKey(nameof(GroupId))]
        [InverseProperty(nameof(Groups.EquipmentsToGroup))]
        public virtual Groups Group { get; set; }
    }
}
