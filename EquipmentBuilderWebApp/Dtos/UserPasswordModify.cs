using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Dtos
{
    public class UserPasswordModify
    {
        public string PasswordNew { get; set; }
        public string PasswordNewApproved { get; set; }
        public int UserId { get; set; }
    }
}
