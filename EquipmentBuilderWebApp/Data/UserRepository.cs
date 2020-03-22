using EquipmentBuilder.API.Context;
using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data
{
    public class UserRepository : IUserRepository
    {

        public readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// metoda zwraca wszystkich dostępnych użytkowników bez administratorów oraz bez aktualnego uztkownika
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Users>> GetUserList(int userId)
        {
            var userList = await _context.Users.Where(x=>x.Id != userId && x.IsAdmin == false).ToListAsync();
            return userList;
        }
    }
}
