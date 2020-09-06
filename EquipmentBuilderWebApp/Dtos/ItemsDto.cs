using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class ItemsDto
    {
        public ItemsDto()
        {

        }
        public int Id { get; set; }

        public string ItemName { get; set; }
        public int MinHeroLvl { get; set; }

        public string GameName { get; set; }

    }
}
