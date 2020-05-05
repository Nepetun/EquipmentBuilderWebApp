using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class EquipmentListDto
    {
        public string EqName { get; set; }
        public string HeroName { get; set; }

        public int HeroLvl { get; set; }

        public int CounterOfLikes { get; set; }
    }
}
