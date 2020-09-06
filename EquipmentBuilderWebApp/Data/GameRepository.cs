using EquipmentBuilder.API.Common;
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
    public class GameRepository : IGameRepository
    {
        public readonly DataContext _context;
        public GameRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Games> CreateGame(Games game)
        {
            await _context.Games.AddAsync(game);
            await _context.SaveChangesAsync();
            return game;
        }

        public async Task<bool> GameExists(string gameName)
        {
            if (await _context.Games.AnyAsync(x => x.GameName == gameName))
                return true;

            return false;
        }

        public async Task<PagedList<Games>> GetGames(PageParams pageParams)
        {
            List<Games> lstGames = await _context.Games.ToListAsync();
            return await PagedList<Games>.Create(lstGames, pageParams.PageNumber, pageParams.PageSize);
        }
  
    }
}
