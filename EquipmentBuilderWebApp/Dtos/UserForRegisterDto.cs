using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage = "Nazwa użytkownika jest wymagana")] //dzieki takiej adnotacji wymuszamy walidacje na wpisanie username
        [StringLength(20, MinimumLength = 5, ErrorMessage = "Hasło musi miec od 5 do 20 znaków")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Hasło jest wymagane")]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Hasło musi miec od 4 do 8 znaków")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Email jest wymagane")]
        [StringLength(20, MinimumLength = 5, ErrorMessage = "Email musi miec od 5 do 20 znaków")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Imie jest wymagane")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Imie nie może przekraczać 20 znaków")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Nazwisko jest wymagane")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Nazwisko nie może przekraczać 50 znaków")]
        public string Surname { get; set; }
        [Required(ErrorMessage = "Data urodzenia jest wymagana")]
        public DateTime DateOfBirth { get; set; }

    }
}
