using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class CommentDto
    {
        public int EquipmentId { get; set; }
        [Required(ErrorMessage = "Komentarz jest wymagany")]
        public string  CommentString { get; set; }
        [Required(ErrorMessage = "Użytkownik jest wymagany")]
        public int UserId { get; set; }

    }
}
