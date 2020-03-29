﻿
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

            var sendInvitations = await _context.Invitations.Where(x => x.UserRecipientId == userId).ToListAsync();
            return sendInvitations;
        }

        public async Task<IEnumerable<Invitations>> GetSendedInvitations(int userId)
        {
            var reciveInvitation = await _context.Invitations.Where(x => x.UserAdresserId == userId).ToListAsync();
           //recipient odbiorca

            return reciveInvitation;
        }


        /// <summary>
        /// metoda wysyła zaproszenie do użytkownika- yebz dyialao uztkownik musi mie grup yaoon !!!!
        /// </summary>
        /// <returns></returns>
        public async Task<Invitations> SendInvitation(Invitations invitation)
        {
            //invitation
            await _context.Invitations.AddAsync(invitation);

            await _context.SaveChangesAsync();
            return invitation;
        }


        public async Task<bool> InvitationWasSend(int userId, int recipientUserId, int invitationGroupId)
        {
            if( await _context.Invitations.AnyAsync(x=>x.UserAdresserId == userId && x.UserRecipientId == recipientUserId))           
                return true;

            return false;
        }

        /// <summary>
        /// metoda akceptuje zaproszenie do grupy
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="invitationId"></param>
        /// <returns></returns>
        public async Task<Invitations> AcceptInvitation(int userId, int invitationId)
        {
            //await _context.Invitations.AddAsync(invitation);

            var invitation = await _context.Invitations.FirstOrDefaultAsync(z => z.UserAdresserId == userId && z.Id == invitationId);

            var usrToGrp = await _context.UserToGroups.FirstOrDefaultAsync();

            usrToGrp.GroupId = invitation.GroupId;
            usrToGrp.UserId = invitation.UserRecipientId;


            await _context.UserToGroups.AddAsync(usrToGrp);

            _context.Invitations.Remove(invitation);

            await _context.SaveChangesAsync();
            return invitation;
        }

        /// <summary>
        /// metoda odrzuca zaproszenie do grupy
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="invitationId"></param>
        /// <returns></returns>
        public async Task<Invitations> RejectInvitation(int userId, int invitationId)
        {
            //pobranie zaproszenia
            var invitation = await _context.Invitations.FirstOrDefaultAsync(z => z.UserAdresserId == userId && z.Id == invitationId);

            _context.Invitations.Remove(invitation);

            await _context.SaveChangesAsync();
            return invitation;
        }


        //public async Task<bool> InvitationWasSend(int invitationId)
        //{
        //    if (await _context.Invitations.AnyAsync(x => x.Id == invitationId))
        //        return true;

        //    return false;
        //}


    }
}