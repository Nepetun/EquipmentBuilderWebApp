using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class EquipmentDto
    {
        [Required(ErrorMessage = "Nazwa ekwipunku jest wymagana")]
        [StringLength(20, MinimumLength = 5, ErrorMessage = "Nazwa ekwipunku musi miec od 5 do 20 znaków")]
        public string EqName { get; set; }

        [Required(ErrorMessage = "Musisz wybrać bohatera")]
        public int? HeroId { get; set; }

        public int HeroLvl { get; set; }

        [Required(ErrorMessage = "Coś poszło nie tak - nie przypisano użytkownika..")]
        public int UserId { get; set; }
        public int? FirtItemId { get; set; }
        public int? SecondItemId { get; set; }
        public int? ThirdItemId { get; set; }
        public int? FourthItemId { get; set; }
        public int? FifthItemId { get; set; }
        public int? SixthItemId { get; set; }

        public int EquipmentId { get; set; }

        public string GameName { get; set; }

        public int GameId { get; set; }
    }
}
