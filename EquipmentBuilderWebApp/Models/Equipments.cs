using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class Equipments
    {
        public Equipments()
        {
            Comments = new HashSet<Comments>();
            EquipmentsToGroup = new HashSet<EquipmentsToGroup>();
            Likes = new HashSet<Likes>();
            UserHeroesLvl = new HashSet<UserHeroesLvl>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(100)]
        public string EqName { get; set; }
        public int? HeroId { get; set; }
        public int? UserId { get; set; }
        public int? FirtItemId { get; set; }
        public int? SecondItemId { get; set; }
        public int? ThirdItemId { get; set; }
        public int? FourthItemId { get; set; }
        public int? FifthItemId { get; set; }
        public int? SixthItemId { get; set; }

        [ForeignKey(nameof(FifthItemId))]
        [InverseProperty(nameof(Items.EquipmentsFifthItem))]
        public virtual Items FifthItem { get; set; }
        [ForeignKey(nameof(FirtItemId))]
        [InverseProperty(nameof(Items.EquipmentsFirtItem))]
        public virtual Items FirtItem { get; set; }
        [ForeignKey(nameof(FourthItemId))]
        [InverseProperty(nameof(Items.EquipmentsFourthItem))]
        public virtual Items FourthItem { get; set; }
        [ForeignKey(nameof(HeroId))]
        [InverseProperty(nameof(Heroes.Equipments))]
        public virtual Heroes Hero { get; set; }
        [ForeignKey(nameof(SecondItemId))]
        [InverseProperty(nameof(Items.EquipmentsSecondItem))]
        public virtual Items SecondItem { get; set; }
        [ForeignKey(nameof(SixthItemId))]
        [InverseProperty(nameof(Items.EquipmentsSixthItem))]
        public virtual Items SixthItem { get; set; }
        [ForeignKey(nameof(ThirdItemId))]
        [InverseProperty(nameof(Items.EquipmentsThirdItem))]
        public virtual Items ThirdItem { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Users.Equipments))]
        public virtual Users User { get; set; }
        [InverseProperty("Equipment")]
        public virtual ICollection<Comments> Comments { get; set; }
        [InverseProperty("Equipment")]
        public virtual ICollection<EquipmentsToGroup> EquipmentsToGroup { get; set; }
        [InverseProperty("Equipment")]
        public virtual ICollection<Likes> Likes { get; set; }
        [InverseProperty("Equipment")]
        public virtual ICollection<UserHeroesLvl> UserHeroesLvl { get; set; }
    }
}
