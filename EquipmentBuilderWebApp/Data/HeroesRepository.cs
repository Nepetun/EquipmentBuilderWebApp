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
    public class HeroesRepository : IHeroesRepository
    {
        private readonly DataContext _context;

        public HeroesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HeroDto>> GetAllHeroes()
        {     
            var lstHeroes = await _context.Heroes.ToListAsync();

            var lstItemsFromApi = new List<HeroDto>();

            foreach (Heroes hero in lstHeroes)
            {
                var heroToCreate = new HeroDto();
                heroToCreate.Id = hero.Id;
                heroToCreate.HeroName = hero.HeroName;              

                lstItemsFromApi.Add(heroToCreate);
            }

            return lstItemsFromApi;
        }
    }
}
