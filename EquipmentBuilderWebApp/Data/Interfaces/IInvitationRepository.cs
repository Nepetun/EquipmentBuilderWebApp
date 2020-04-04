
using EquipmentBuilder.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface IInvitationRepository
    {
        public Task<IEnumerable<Invitations>> GetRecieveInvitations(int userId);
        public Task<IEnumerable<Invitations>> GetSendedInvitations(int userId);

        public Task<Invitations> SendInvitation(Invitations invitation);

        public Task<bool> InvitationWasSend(int userId, int recipientUserId, int groupId);

        public Task<Invitations> AcceptInvitation(int userId, int invitationId);


        public Task<Invitations> RejectInvitation(int userId, int invitationId);

        public Task<bool> UserExistsInGroup(int recipientUserId, int groupId);

    }
}
