using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Common.Filters;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface IEquipmentRepository
    {
        //Task<List<EquipmentListDto>> ListMyEquipments(PageParams pageParams ,int userId);
        Task<PagedList<EquipmentListDto>> ListMyEquipments(PageParams pageParams, int userId, EquipmentFilter eqFilters, bool isAdmin);

        Task<EquipmentDto> GetEquipmentById(int equipmentId);

        Task<IEnumerable<SharedEquipmentInformation>> ListSharedEquipments(int userId); //, int groupId

        Task<Equipments> AddEquipment(Equipments equipment, int heroLvl);

        Task<Equipments> UpdateEquipment(Equipments equipment, int heroLvl, int equipmentId);

        Task<bool> ValidateEquipmentName(string equipmentName, int userId);

        Task<bool> ValidateEquipmentNameForUpdate(string equipmentName, int userId, int equipmentId);

        Task<bool> DeleteEquipment(int equipmentId);
        Task<bool> DeleteShareEquipment(int equipmentId, int groupId);

        Task<bool> CheckThatUserHaveGroupsAndSharedEquipments(int userId);

        Task<Equipments> ShareEquipment(ShareEquipmentDto equipmentToShare);
        

        Task<bool> CheckThatEqWasShared(int equipmentId, int groupId);
    }
}
