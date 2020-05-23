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
    public class CommentRepository : ICommentRepository
    {
        private readonly DataContext _context;

        public CommentRepository(DataContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<CommentToShowDto>> GetCommentsForEquipment(int equipmentId)
        {
            List<CommentToShowDto> lst = new List<CommentToShowDto>();

            var comments = await _context.Comments.Where(x => x.EquipmentId == equipmentId).OrderByDescending(x=> x.Tmstmp).ToListAsync();



            // uzupełnienie użytkownika
            foreach(Comments com in comments)
            {
                CommentToShowDto comToShow = new CommentToShowDto();
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == com.UserId);
                comToShow.UserName = user.UserName;
                comToShow.EquipmentId = (int)com.EquipmentId;
                comToShow.CommentString = com.Comment;
                comToShow.Tmstmp = (DateTime)com.Tmstmp;
                comToShow.CommentId = com.Id;
                lst.Add(comToShow);
            }
            

            return lst;
        }

        public async Task<Comments> AddComment(string comment, int equipmentId, int userId)
        {
            //pobranie ekwipunku do którego chcemy dodać komentarz
            var equipment = await _context.Equipments.FirstOrDefaultAsync(x=>x.Id == equipmentId);

            var commentToAdd = new Comments()
            {
                Comment = comment,
                EquipmentId = equipment.Id,
                UserId = userId
            };

            await _context.Comments.AddAsync(commentToAdd);
            await _context.SaveChangesAsync();

            return commentToAdd;
        }


        public async Task<bool> EquipmentExists(int equipmentId)
        {
            if (await _context.Equipments.AnyAsync(x => x.Id == equipmentId))
                return true;

            return false;
        }


        public async Task<bool> DeleteComment(int commentId)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == commentId);

            _context.Comments.Remove(comment);

            await _context.SaveChangesAsync();

            return true;
        }
    }



}
