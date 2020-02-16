using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required] //dzieki takiej adnotacji wymuszamy walidacje na wpisanie username
        public string UserName { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Hasło musi miec od 4 do 8 znaków")]
        public string Password { get; set; }
    }
}
