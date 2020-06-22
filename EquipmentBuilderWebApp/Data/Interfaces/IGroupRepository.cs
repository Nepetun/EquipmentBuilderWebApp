using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Common.Filters;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface IGroupRepository
    {

        public Task<PagedList<GroupListDto>> GetUserGroups(PageParams pageParams, int userId, GroupFilter filters);

        public Task<Groups> CreateGroup(Groups group);
        public Task<bool> GroupExists(string groupName);

        public Task<bool> DeleteGroup(int groupId);

        public Task<bool> ModifyGroup(int userId, string groupName, int groupId);

    }
}
