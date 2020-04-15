using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class HeroPickedDto
    {
        public HeroPickedDto()
        {

        }
        public int HeroId { get; set; }

        public int HeroLvl { get; set; }
    }
}
