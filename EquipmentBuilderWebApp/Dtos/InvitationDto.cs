using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class InvitationDto
    {
        public InvitationDto()
        {

        }

        public string GroupName { get; set; }
        public int GroupId { get; set; }
        public int InvitationId { get; set; }

    }
}
