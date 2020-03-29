using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{

    public class SendInvitationDto
    {
        public int UserId { get; set; }
        public int RecipientUserId { get; set; }

        public int InvitationGroupId { get; set; }
    }
}
