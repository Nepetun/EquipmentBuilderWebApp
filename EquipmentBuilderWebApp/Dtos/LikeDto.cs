using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class LikeDto
    {
        public int UserId { get; set; }

        public int EquipmentId { get; set; }
    }
}
