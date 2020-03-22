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

    }
}
