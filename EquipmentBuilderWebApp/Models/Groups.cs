using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class Groups
    {
        public Groups()
        {
            EquipmentsToGroup = new HashSet<EquipmentsToGroup>();
            Invitations = new HashSet<Invitations>();
            UserToGroups = new HashSet<UserToGroups>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string GroupName { get; set; }
        public int? GroupAdminId { get; set; }

        [ForeignKey(nameof(GroupAdminId))]
        [InverseProperty(nameof(Users.Groups))]
        public virtual Users GroupAdmin { get; set; }
        [InverseProperty("Group")]
        public virtual ICollection<EquipmentsToGroup> EquipmentsToGroup { get; set; }
        [InverseProperty("Group")]
        public virtual ICollection<Invitations> Invitations { get; set; }
        [InverseProperty("Group")]
        public virtual ICollection<UserToGroups> UserToGroups { get; set; }
    }
}
