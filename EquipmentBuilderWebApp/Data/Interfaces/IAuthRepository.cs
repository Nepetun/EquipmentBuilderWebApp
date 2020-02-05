using System.Threading.Tasks;
using EquipmentBuilder.API.Models;

namespace EquipmentBuilder.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);

        Task<User> Login(string userName, string password);

        Task<bool> UserExists(string userName);
    }
}