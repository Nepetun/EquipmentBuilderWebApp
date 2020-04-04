using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class UserToModifyNameDto
    {
        [Required(ErrorMessage = "Nazwa użytkownika jest wymagana")] //dzieki takiej adnotacji wymuszamy walidacje na wpisanie username
        [StringLength(20, MinimumLength = 5, ErrorMessage = "Hasło musi miec od 5 do 20 znaków")]
        public string UserName { get; set; }

   
        public int UserId { get; set; }

    }
}
