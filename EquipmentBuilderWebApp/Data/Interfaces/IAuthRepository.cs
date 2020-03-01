using EquipmentBuilder.API.Models;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface IAuthRepository
    {

        Task<Users> Register(Users user, string password);

        Task<Users> Login(string userName, string password);

        Task<bool> UserExists(string userName);
    }
}