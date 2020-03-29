﻿using EquipmentBuilder.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface IGroupRepository
    {

        public Task<IEnumerable<Groups>> GetUserGroups(int userId);

        public Task<Groups> CreateGroup(Groups group);
        public Task<bool> GroupExists(string groupName);

    }
}
