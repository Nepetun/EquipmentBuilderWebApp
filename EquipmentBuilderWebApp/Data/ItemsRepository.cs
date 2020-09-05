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
    public class ItemsRepository : IItemsRepository
    {
        private readonly DataContext _context;

        public ItemsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Items> CreateItem(Items itemToCreate)
        {
            int id = await _context.Items.MaxAsync(x => x.Id);
            itemToCreate.Id = id + 1;
            await _context.Items.AddAsync(itemToCreate);
            await _context.SaveChangesAsync();
            return itemToCreate;
        }

        public async Task<ItemStats> CreateItemStats(ItemStats itemStats)
        {
            int id = await _context.ItemStats.MaxAsync(x => x.Id);
            itemStats.Id = id + 1;
            await _context.ItemStats.AddAsync(itemStats);
            await _context.SaveChangesAsync();
            return itemStats;
        }

        public async Task<bool> DeleteItem(int itemId)
        {
            Items item = await _context.Items.FirstOrDefaultAsync(x => x.Id == itemId);
            if (item == null)
                return false;
            try
            {
                ItemStats itemStats = await _context.ItemStats.FirstOrDefaultAsync(x => x.ItemId == itemId);

                _context.ItemStats.Remove(itemStats);
                await _context.SaveChangesAsync();

                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return true;
        }

        public async Task<IEnumerable<ItemsDto>> GetAllItems()
        {
            // dodać statystyki itemow..
            var lstItems = await _context.Items.ToListAsync();

            var lstItemsFromApi = new List<ItemsDto>();

            foreach(Items item in lstItems)
            {
                var itemToCreate = new ItemsDto();
                itemToCreate.Id = item.Id;
                itemToCreate.ItemName = item.ItemName;
                itemToCreate.MinHeroLvl = (int)item.MinHeroLvl;

                lstItemsFromApi.Add(itemToCreate);
            }

            return lstItemsFromApi;            
        }

        public async Task<PagedList<ItemsDto>> GetItemsToManagement(PageParams pageParams, ItemManagementFilter filter)
        {
            List<ItemsDto> lstItemsListed = new List<ItemsDto>();
            List<Items> lstItems = new List<Items>();
            lstItems = await _context.Items.ToListAsync();

            if (filter.ItemNameLike != null)
            {
                lstItems = lstItems.Where(x => x.ItemName.ToLower().Contains(filter.ItemNameLike.ToLower())).ToList();
            }


            foreach (Items item in lstItems)
            {
                ItemsDto itemdto = new ItemsDto()
                {
                    Id = item.Id,
                    ItemName = item.ItemName,
                    MinHeroLvl = (int)item.MinHeroLvl
                };
                lstItemsListed.Add(itemdto);
            }

            return await PagedList<ItemsDto>.Create(lstItemsListed, pageParams.PageNumber, pageParams.PageSize);
        }

        public async Task<int> GetItemId(string itemToModify)
        {
            var itemToModifyData = await _context.Items.FirstOrDefaultAsync(x => x.ItemName.ToLower() == itemToModify.ToLower());
            return itemToModifyData.Id;
        }

        public async Task<bool> ModifyItemStats(ItemStats itemStats)
        {
            var itemStatsToModifyData = await _context.ItemStats.FirstOrDefaultAsync(x => x.ItemId == itemStats.ItemId);


            itemStatsToModifyData.AdditionalAp = itemStats.AdditionalAp;
            itemStatsToModifyData.AdditionalArmour = itemStats.AdditionalArmour;
            itemStatsToModifyData.AdditionalAttackSpeed = itemStats.AdditionalAttackSpeed;
            itemStatsToModifyData.AdditionalBasicHpRegenPercentage = itemStats.AdditionalBasicHpRegenPercentage;
            itemStatsToModifyData.AdditionalBasicManaRegenPercentage = itemStats.AdditionalBasicManaRegenPercentage;
            itemStatsToModifyData.AdditionalCooldownReduction = itemStats.AdditionalCooldownReduction;
            itemStatsToModifyData.AdditionalCriticalChance = itemStats.AdditionalCriticalChance;
            itemStatsToModifyData.AdditionalDmg = itemStats.AdditionalDmg;
            itemStatsToModifyData.AdditionalGoldPerTenSec = itemStats.AdditionalGoldPerTenSec;
            itemStatsToModifyData.AdditionalHitPointsPerHit = itemStats.AdditionalHitPointsPerHit;
            itemStatsToModifyData.AdditionalHp = itemStats.AdditionalHp;
            itemStatsToModifyData.AdditionalLifeSteal = itemStats.AdditionalLifeSteal;
            itemStatsToModifyData.AdditionalMagicResist = itemStats.AdditionalMagicResist;
            itemStatsToModifyData.AdditionalMana = itemStats.AdditionalMana;
            itemStatsToModifyData.AdditionalManaRegen = itemStats.AdditionalManaRegen;
            itemStatsToModifyData.AdditionalMovementSpeed = itemStats.AdditionalMovementSpeed;
            itemStatsToModifyData.AdditionalPotionPower = itemStats.AdditionalPotionPower;
            itemStatsToModifyData.Descriptions = itemStats.Descriptions;
            itemStatsToModifyData.Price = itemStats.Price;

            _context.ItemStats.Update(itemStatsToModifyData);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ValidateItemName(string itemName)
        {
            if (await _context.Items.AnyAsync(x => x.ItemName == itemName))
                return true;
            else
                return false;
        }

        public async Task<ItemsManagementDto> GetItemToModify(int itemId)
        {
            ItemsManagementDto itemToReturn = new ItemsManagementDto();

            Items item = await _context.Items.FirstOrDefaultAsync(x => x.Id == itemId);

            ItemStats itemStats = await _context.ItemStats.FirstOrDefaultAsync(x => x.ItemId == item.Id);

            itemToReturn.AdditionalAp = itemStats.AdditionalAp;
            itemToReturn.AdditionalArmour = itemStats.AdditionalArmour;
            itemToReturn.AdditionalAttackSpeed = itemStats.AdditionalAttackSpeed;
            itemToReturn.AdditionalBasicHpRegenPercentage = itemStats.AdditionalBasicHpRegenPercentage;
            itemToReturn.AdditionalBasicManaRegenPercentage = itemStats.AdditionalBasicManaRegenPercentage;
            itemToReturn.AdditionalCooldownReduction = itemStats.AdditionalCooldownReduction;
            itemToReturn.AdditionalCriticalChance = itemStats.AdditionalCriticalChance;
            itemToReturn.AdditionalDmg = itemStats.AdditionalDmg;
            itemToReturn.AdditionalGoldPerTenSec = itemStats.AdditionalGoldPerTenSec;
            itemToReturn.AdditionalHitPointsPerHit = itemStats.AdditionalHitPointsPerHit;
            itemToReturn.AdditionalHp = itemStats.AdditionalHp;
            itemToReturn.AdditionalLifeSteal = itemStats.AdditionalLifeSteal;
            itemToReturn.AdditionalMagicResist = itemStats.AdditionalMagicResist;
            itemToReturn.AdditionalMana = itemStats.AdditionalMana;
            itemToReturn.AdditionalManaRegen = itemStats.AdditionalManaRegen;
            itemToReturn.AdditionalMovementSpeed = itemStats.AdditionalMovementSpeed;
            itemToReturn.AdditionalPotionPower = itemStats.AdditionalPotionPower;
            itemToReturn.Descriptions = itemStats.Descriptions;
            itemToReturn.Price = itemStats.Price;
            itemToReturn.ItemName = item.ItemName;
            itemToReturn.MinHeroLvl = (int)item.MinHeroLvl;

            return itemToReturn;
        }
    }
}
