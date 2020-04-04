using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{

    public class SendInvitationDto
    {
        public int UserId { get; set; }

        [Required(ErrorMessage = "Odbiorca zaproszenia jest wymagany")]
        public int RecipientUserId { get; set; }

        [Required(ErrorMessage = "Grupa zaproszenia jest wymagana")]
        public int InvitationGroupId { get; set; }
    }
}
