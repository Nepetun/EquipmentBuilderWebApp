using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class Items
    {
        public Items()
        {
            EquipmentsFifthItem = new HashSet<Equipments>();
            EquipmentsFirtItem = new HashSet<Equipments>();
            EquipmentsFourthItem = new HashSet<Equipments>();
            EquipmentsSecondItem = new HashSet<Equipments>();
            EquipmentsSixthItem = new HashSet<Equipments>();
            EquipmentsThirdItem = new HashSet<Equipments>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(200)]
        public string ItemName { get; set; }
        public int? MinHeroLvl { get; set; }

        [InverseProperty("IdNavigation")]
        public virtual ItemStats ItemStats { get; set; }
        [InverseProperty(nameof(Equipments.FifthItem))]
        public virtual ICollection<Equipments> EquipmentsFifthItem { get; set; }
        [InverseProperty(nameof(Equipments.FirtItem))]
        public virtual ICollection<Equipments> EquipmentsFirtItem { get; set; }
        [InverseProperty(nameof(Equipments.FourthItem))]
        public virtual ICollection<Equipments> EquipmentsFourthItem { get; set; }
        [InverseProperty(nameof(Equipments.SecondItem))]
        public virtual ICollection<Equipments> EquipmentsSecondItem { get; set; }
        [InverseProperty(nameof(Equipments.SixthItem))]
        public virtual ICollection<Equipments> EquipmentsSixthItem { get; set; }
        [InverseProperty(nameof(Equipments.ThirdItem))]
        public virtual ICollection<Equipments> EquipmentsThirdItem { get; set; }
    }
}
