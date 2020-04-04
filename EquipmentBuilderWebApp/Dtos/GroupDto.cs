using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class GroupDto
    {
        public int UserId { get; set; }

        [Required(ErrorMessage = "Nazwa grupy jest wymagana")]
        [StringLength(40, MinimumLength = 4, ErrorMessage = "Nazwa grupy musi miec od 4 do 45 znaków")]
        public string GroupName { get; set; }

        //używane do modyfikacji
        public int GroupId { get; set; }
    }
}
