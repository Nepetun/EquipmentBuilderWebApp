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
    }
}
