using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class CommentToShowDto
    {
        public int EquipmentId { get; set; }

        public string CommentString { get; set; }

        public string UserName { get; set; }
        public DateTime Tmstmp { get; set; }

        public int CommentId { get; set; }
    }
}
