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
    public class GroupRepository : IGroupRepository
    {

        private readonly DataContext _context;

        public GroupRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Groups> CreateGroup(Groups group)
        {
            await _context.Groups.AddAsync(group);

            await _context.SaveChangesAsync();
            return group;
        }

        public async Task<IEnumerable<Groups>> GetUserGroups(int userId)
        {
            var userGroups = await _context.Groups.Where(x => x.GroupAdminId == userId).ToListAsync();

            return userGroups;
        }

        public async Task<bool> GroupExists(string groupName)
        {
            if (await _context.Groups.AnyAsync(x => x.GroupName == groupName))
                return true;

            return false;
        }
    }
}
