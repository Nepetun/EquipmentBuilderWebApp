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
        [StringLength(50, MinimumLength = 5, ErrorMessage = "Nazwa użytkownika musi miec od 5 do 50 znaków")]
        public string UserName { get; set; }

   
        public int UserId { get; set; }

    }
}
