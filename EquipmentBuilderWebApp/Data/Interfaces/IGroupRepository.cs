﻿using EquipmentBuilder.API.Common;
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

        public Task<PagedList<GroupListDto>> GetUserGroups(PageParams pageParams, int userId, GroupFilter filters, bool isAdmin);
        public Task<GroupDto> GetGroupById(int groupId);

        public Task<PagedList<UserToModifyNameDto>> GetUsersForApplication(PageParams pageParams, int groupId, GroupUsersFilter filters);
        public Task<PagedList<UserToModifyNameDto>> GetUsersFromGroup(PageParams pageParams, int groupId, GroupUsersFilter filters);

        public Task<Groups> CreateGroup(Groups group);
        public Task<bool> GroupExists(string groupName);

        public Task<bool> DeleteGroup(int groupId);
        public Task<bool> DeleteUserFromGroup(int userId, int groupId);
        public Task<bool> ModifyGroup(int userId, string groupName, int groupId);

    }
}
