using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class GroupListDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string GroupName { get; set; }
        public int? GroupAdminId { get; set; }

        public string GroupAdminName { get; set; }

    }
}
