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
    public class LikeRepository : ILikeRepository
    {
        private readonly DataContext _context;

        public LikeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Likes> AddLike(int equipmentId, int userId)
        {
            var likeToAdd = new Likes()
            {
                EquipmentId = equipmentId,
                UserId = userId,
                Tmstmp = DateTime.Now
            };

            await _context.Likes.AddAsync(likeToAdd);
            await _context.SaveChangesAsync();
            return likeToAdd;
        }

        public async Task<bool> EquipmentExists(int equipmentId)
        {
            if (await _context.Equipments.AnyAsync(x => x.Id == equipmentId))
                return true;

            return false;
        }

        public async Task<int> GetCountOfLike(int equipmentId)
        {
            return await _context.Likes.Where(x => x.EquipmentId == equipmentId).CountAsync();
        }

        public async Task<bool> RemoveLike(int equipmentId, int userId)
        {
            var likeToRemove = await _context.Likes.FirstOrDefaultAsync(x => x.EquipmentId == equipmentId && x.UserId == userId);

            _context.Likes.Remove(likeToRemove);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> WasLiked(int equipmentId, int userId)
        {
            if (await _context.Likes.AnyAsync(x => x.EquipmentId == equipmentId && x.UserId == userId))
                return true;

            return false;
        }
    }
}
