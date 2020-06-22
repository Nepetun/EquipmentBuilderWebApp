using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Common.Filters
{
    public class GroupFilter
    {
        public GroupFilter()
        {

        }

        public string GroupNameLike { get; set; } = "";

        public string GroupAdminNameLike { get; set; } = "";
    }
}
