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


        public async Task<bool> ModifyGroup(int userId, string groupName, int groupId)
        {
            var groupToModify = await _context.Groups.FirstOrDefaultAsync(x => x.Id == groupId);


            groupToModify.GroupName = groupName;
            groupToModify.GroupAdminId = userId;

            _context.Groups.Update(groupToModify);

            await _context.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// metoda usuwa grupe
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public async Task<bool> DeleteGroup(int groupId)
        {
            /*
             Kolejno:
             1) usunięcie zaproszeń dla danej grupy
             2) usuniecie wszystkich użytkowników z grupy
             3) usuniecie wysharowan dla danej grupy
             4) uusniecie grupy
             */
            //1) 
            var invitationsToDeleteList = await _context.Invitations.Where(x => x.GroupId == groupId).ToListAsync();

            if(invitationsToDeleteList != null)
            {
                foreach(Invitations inv in invitationsToDeleteList)
                {
                    _context.Invitations.Remove(inv);
                    await _context.SaveChangesAsync();
                }
            }

            //2)
            var userToGroupDeleteList = await _context.UserToGroups.Where(x => x.GroupId == groupId).ToListAsync();

            if(userToGroupDeleteList != null)
            {
                foreach(UserToGroups utg in userToGroupDeleteList)
                {
                    _context.UserToGroups.Remove(utg);
                    await _context.SaveChangesAsync();
                }
            }

            //3)
            var equipmentToDeleteList = await _context.EquipmentsToGroup.Where(x => x.GroupId == groupId).ToListAsync();

            if(equipmentToDeleteList != null)
            {
                foreach(EquipmentsToGroup etg in equipmentToDeleteList)
                {
                    _context.EquipmentsToGroup.Remove(etg);
                    await _context.SaveChangesAsync();
                }
            }

            //4)
            var groupToDelete = await _context.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
            
            if (groupToDelete != null)
            {
                _context.Groups.Remove(groupToDelete);
                await _context.SaveChangesAsync();
                return true;
            }            
            return false;
        }
    }
}
