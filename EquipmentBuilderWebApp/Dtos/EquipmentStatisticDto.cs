using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class EquipmentStatisticDto
    {
        public int HeroLvl { get; set; }
        public int? HeroId { get; set; }

        public int? FirtItemId { get; set; }
        public int? SecondItemId { get; set; }
        public int? ThirdItemId { get; set; }
        public int? FourthItemId { get; set; }
        public int? FifthItemId { get; set; }
        public int? SixthItemId { get; set; }
    }
}
