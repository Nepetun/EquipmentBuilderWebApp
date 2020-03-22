
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
    public class InvitationRepository : IInvitationRepository
    {

        private readonly DataContext _context;

        public  InvitationRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Invitations>> GetRecieveInvitations(int userId)
        {
            var reciveInvitation = await _context.Invitations.Where(x => x.UserAdresserId == userId).ToListAsync();

            return reciveInvitation;
        }

        public async Task<IEnumerable<Invitations>> GetSendedInvitations(int userId)
        {
            var sendInvitations = await _context.Invitations.Where(x => x.UserRecipientId == userId).ToListAsync();

            return sendInvitations;
        }
    }
}
