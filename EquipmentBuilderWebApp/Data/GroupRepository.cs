using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Common.Filters;
using EquipmentBuilder.API.Context;
using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Dtos;
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

        public async Task<PagedList<GroupListDto>> GetUserGroups(PageParams pageParams, int userId, GroupFilter groupFilter)
        {
            var userGroupsAdmin = await _context.Groups.Where(x => x.GroupAdminId == userId).ToListAsync();
            // grupy użytkownika do których należy 
            var userGroups = await _context.UserToGroups.Where(x => x.UserId == userId).ToListAsync();

            List<GroupListDto> lstGroups = new List<GroupListDto>();

            // jeżeli uzytkownik jest administratorem danej grupy = założycielem
            if (userGroupsAdmin.Count > 0)
            {
                foreach (Groups grp in userGroupsAdmin)
                {
                    var adminUserName = await _context.Users.FirstOrDefaultAsync(x => x.Id == grp.GroupAdminId);
                    GroupListDto gto = new GroupListDto()
                    {
                        GroupAdminId = grp.GroupAdminId,
                        GroupName = grp.GroupName,
                        Id = grp.Id,
                        UserId = userId,
                        GroupAdminName = adminUserName.UserName
                    };
                    lstGroups.Add(gto);
                }
            }

            // jeżeli użytkownik nalezy do której z grup 
            if( userGroups.Count > 0)
            {
                foreach (UserToGroups utg in userGroups)
                {
                    if (await _context.Groups.AnyAsync(x => x.Id == utg.GroupId)) //pobranie grup
                    {                       
                        var grp = await _context.Groups.FirstOrDefaultAsync(x => x.Id == utg.GroupId);
                        var adminUserName = await _context.Users.FirstOrDefaultAsync(x => x.Id == grp.GroupAdminId);
                        GroupListDto gto = new GroupListDto()
                        {
                            GroupAdminId = grp.GroupAdminId,
                            GroupName = grp.GroupName,
                            Id = grp.Id,
                            UserId = userId,
                            GroupAdminName = adminUserName.UserName
                        };
                        lstGroups.Add(gto);
                    }
                }
            }
        
            
            if (groupFilter != null)
            {
                if (groupFilter.GroupNameLike != null)
                {
                    lstGroups = lstGroups.Where(x => x.GroupName.ToLower().Contains(groupFilter.GroupNameLike.ToLower())).ToList();
                }

                if (groupFilter.GroupAdminNameLike != null)
                {
                    lstGroups = lstGroups.Where(x => x.GroupAdminName.ToLower().Contains(groupFilter.GroupAdminNameLike.ToLower())).ToList();
                }
            }
            
            return await PagedList<GroupListDto>.Create(lstGroups, pageParams.PageNumber, pageParams.PageSize);
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
