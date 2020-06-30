using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class SharedEquipmentInformation
    {
        public string EquipmentName { get; set; }
        public int EquipmentId { get; set; }
        public string GroupName { get; set; }
        public int GroupId{ get; set; }
    }
}
