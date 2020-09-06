using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface IItemsRepository
    {
        Task<IEnumerable<ItemsDto>> GetAllItems();
        Task<bool> ValidateItemName(string itemName);
        Task<Items> CreateItem(Items itemToCreate);
        Task<ItemStats> CreateItemStats(ItemStats itemStats);
        Task<bool> DeleteItem(int itemId);
        Task<PagedList<ItemsDto>> GetItemsToManagement(PageParams pageParams, Common.Filters.ItemManagementFilter filter);
        Task<bool> ModifyItemStats(ItemStats itemStats);
        Task<int> GetItemId(string itemName);
        Task<ItemsManagementDto> GetItemToModify(int itemId);
    }
}
