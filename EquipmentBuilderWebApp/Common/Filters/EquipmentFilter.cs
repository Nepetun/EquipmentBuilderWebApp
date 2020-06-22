using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Common.Filters
{
    public class EquipmentFilter
    {
        public EquipmentFilter()
        {

        }
        public string EquipmentNameLike { get; set; } = "";
        public string UserNameLike { get; set; } = "";

        public string HeroNameLike { get; set; } = "";
        public int HeroLvlFrom { get; set; } = 1;

        public int HeroLvlTo { get; set; } = 18;
    }
}
