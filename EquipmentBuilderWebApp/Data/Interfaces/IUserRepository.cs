using EquipmentBuilder.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface IUserRepository
    {
       Task<IEnumerable<Users>> GetUserList(int userId); //pokazanie wszystkich użytkowników bez akutalnego użytkownika
    }
}
