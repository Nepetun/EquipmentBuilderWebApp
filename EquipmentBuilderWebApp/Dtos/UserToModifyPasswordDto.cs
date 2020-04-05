using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace EquipmentBuilder.API.Dtos
{
    public class UserToModifyPasswordDto
    {
        [Required(ErrorMessage = "Hasło jest wymagane")]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Hasło musi miec od 4 do 8 znaków")]
        public string Password { get; set; }
        public int UserId { get; set; }

    }
}
