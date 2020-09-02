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
    public interface IHeroesRepository
    {
        Task<IEnumerable<HeroDto>> GetAllHeroes();
        Task<PagedList<HeroDto>> GetHeroesToManagement(PageParams pageParams, HeroesManagementFilter filter);
        Task<bool> ValidateHeroName(string heroName);
        Task<Heroes> CreateHero(Heroes heroToCreate);
        Task<HeroeStats> CreateHeroStats(HeroeStats heroStats);
        Task<bool> ModifyHero(Heroes heroToModify);
        Task<bool> ModifyHeroStats(HeroeStats heroStats);
        Task<HeroesManagementDto> GetHeroesToModify(int heroId);
    }
}
