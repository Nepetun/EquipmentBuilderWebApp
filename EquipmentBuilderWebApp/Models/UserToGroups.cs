using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class UserToGroups
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? GroupId { get; set; }

        [ForeignKey(nameof(GroupId))]
        [InverseProperty(nameof(Groups.UserToGroups))]
        public virtual Groups Group { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Users.UserToGroups))]
        public virtual Users User { get; set; }
    }
}
