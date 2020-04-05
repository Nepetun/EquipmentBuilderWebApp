using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface ICommentRepository
    {
        Task<Comments> AddComment(string comment, int equipmentId, int userId);
        Task<bool> EquipmentExists(int equipmentId);

        Task<IEnumerable<CommentToShowDto>> GetCommentsForEquipment(int equipmentId);

        Task<bool> DeleteComment(int commentId);
    }
}
