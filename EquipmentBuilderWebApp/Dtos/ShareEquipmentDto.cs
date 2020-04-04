using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class ShareEquipmentDto
    {
        [Required(ErrorMessage = "Wybierz ekwipunek do udostępnienia")]
        public int EquipmentId { get; set; }
        [Required(ErrorMessage = "Wybierz grupę dla której chcesz udostępnienić ekwpiunek")]
        public int GroupId { get; set; }
    }
}
