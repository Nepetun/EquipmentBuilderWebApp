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
            Comments = new HashSet<Comments>();
            Equipments = new HashSet<Equipments>();
            Groups = new HashSet<Groups>();
            InvitationsUserAdresser = new HashSet<Invitations>();
            InvitationsUserRecipient = new HashSet<Invitations>();
            Likes = new HashSet<Likes>();
            UserHeroesLvl = new HashSet<UserHeroesLvl>();
            UserToGroups = new HashSet<UserToGroups>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(100)]
        public string UserName { get; set; }
        [StringLength(80)]
        public string Email { get; set; }
        [StringLength(50)]
        public string FirstName { get; set; }
        [StringLength(60)]
        public string Surname { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? DateOfBirth { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public bool? IsAdmin { get; set; }

        [InverseProperty("User")]
        public virtual ICollection<Comments> Comments { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<Equipments> Equipments { get; set; }
        [InverseProperty("GroupAdmin")]
        public virtual ICollection<Groups> Groups { get; set; }
        [InverseProperty(nameof(Invitations.UserAdresser))]
        public virtual ICollection<Invitations> InvitationsUserAdresser { get; set; }
        [InverseProperty(nameof(Invitations.UserRecipient))]
        public virtual ICollection<Invitations> InvitationsUserRecipient { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<Likes> Likes { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<UserHeroesLvl> UserHeroesLvl { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<UserToGroups> UserToGroups { get; set; }
    }
}
