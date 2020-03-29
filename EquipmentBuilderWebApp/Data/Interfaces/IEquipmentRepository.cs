﻿using EquipmentBuilder.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface IEquipmentRepository
    {
        Task<IEnumerable<Equipments>> ListMyEquipments(int userId);

        Task<IEnumerable<Equipments>> ListSharedEquipments(int userId);

        Task<Equipments> AddEquipment(Equipments equipment);

        Task<bool> ValidateEquipmentName(string equipmentName, int userId);

        string DeleteEquipment(int equipmentId);

        Task<bool> CheckThatUserHaveGroupsAndSharedEquipments(int userId);
    }
}