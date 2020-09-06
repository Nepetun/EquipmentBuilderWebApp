using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface IGameRepository
    {
        public Task<PagedList<Games>> GetGames(PageParams pageParams);
        public Task<Games> CreateGame(Games game);
        Task<bool> GameExists(string gameName);
    }
}
