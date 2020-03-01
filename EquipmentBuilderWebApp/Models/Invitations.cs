using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EquipmentBuilder.API.Models
{
    public partial class Invitations
    {
        [Key]
        public int Id { get; set; }
        public int? UserRecipientId { get; set; }
        public int? UserAdresserId { get; set; }
        public int? GroupId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Tmstmp { get; set; }

        [ForeignKey(nameof(GroupId))]
        [InverseProperty(nameof(Groups.Invitations))]
        public virtual Groups Group { get; set; }
        [ForeignKey(nameof(UserAdresserId))]
        [InverseProperty(nameof(Users.InvitationsUserAdresser))]
        public virtual Users UserAdresser { get; set; }
        [ForeignKey(nameof(UserRecipientId))]
        [InverseProperty(nameof(Users.InvitationsUserRecipient))]
        public virtual Users UserRecipient { get; set; }
    }
}
