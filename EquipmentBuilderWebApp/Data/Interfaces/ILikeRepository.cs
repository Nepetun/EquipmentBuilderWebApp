using EquipmentBuilder.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface ILikeRepository
    {
        Task<Likes> AddLike(int equipmentId, int userId);
        Task<bool> RemoveLike(int equipmentId, int userId);
        Task<int> GetCountOfLike(int equipmentId);
        Task<bool> EquipmentExists(int equipmentId);

        Task<bool> WasLiked(int equipmentId, int userId);
    }
}
