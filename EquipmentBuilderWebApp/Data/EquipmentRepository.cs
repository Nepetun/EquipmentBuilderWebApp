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
    public class EquipmentRepository : IEquipmentRepository
    {

        public readonly DataContext _context;
        public EquipmentRepository(DataContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Equipments>> ListMyEquipments(int userId)
        {
            var equipments = await _context.Equipments.Where(x => x.UserId == userId).ToListAsync();
            return equipments;
        }


        public async Task<Equipments> AddEquipment(Equipments equipment)
        {
            // generowanie zestawienia ekwipunku
            await _context.Equipments.AddAsync(equipment);

            await _context.SaveChangesAsync();
            return equipment;

        }

        public string DeleteEquipment(int equipmentId)
        {
            Equipments eq = _context.Equipments.FirstOrDefault(x => x.Id == equipmentId);
            if (eq == null)
                return "brak danych do usunięcia";

            _context.Equipments.Remove(eq);
            _context.SaveChangesAsync();

            return "pomyślnie usunięto ekwipunek";
        }

        #region walidacje
        public async Task<bool> ValidateEquipmentName(string equipmentName, int userId)
        {
            if (await _context.Equipments.AnyAsync(x => x.UserId == userId && x.EqName == equipmentName))
                return true;
            return false;
        }
        #endregion


        /// <summary>
        /// przegladnie udostepnionych ekwipunkow - zalezne od grup do ktorych nalezy uzytkownik 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Equipments>> ListSharedEquipments(int userId)
        {
            //pobranie grup uzytkownika
            var userGroups = _context.UserToGroups.Where(x => x.UserId == userId).ToList();

            if (userGroups.Count > 0)
            {
                List<Equipments> lstEquipments = new List<Equipments>();
                //pobranie ekwipunkow udostępnionych dla grup użytkowników
                foreach (UserToGroups groupId in _context.UserToGroups.Where(x => x.UserId == userId).ToList())
                {
                    foreach( EquipmentsToGroup eqToGroup in _context.EquipmentsToGroup.Where(x=>x.GroupId == groupId.GroupId).ToList())
                    {
                        if(await _context.Equipments.AnyAsync(x => x.Id == eqToGroup.EquipmentId))
                        {
                            Equipments sharedEquipment = await _context.Equipments.FirstOrDefaultAsync(x => x.Id == eqToGroup.EquipmentId);
                            lstEquipments.Add(sharedEquipment);
                        }                        
                    }                   
                }

                return lstEquipments;
            }
            return new List<Equipments>();
        }

        public async Task<bool> CheckThatUserHaveGroupsAndSharedEquipments(int userId)
        {
            if (await _context.UserToGroups.AnyAsync(x => x.UserId == userId))
            {
                foreach (UserToGroups groupId in _context.UserToGroups.Where(x => x.UserId == userId).ToList())
                {
                    // jezeli uzytkownik nalezy przynajmniej do jednej grupy gdzie zostal wysharowany ekwipunek przez innnego gracza
                    if (await _context.EquipmentsToGroup.AnyAsync(x => x.GroupId == groupId.GroupId))
                    {
                        return false;
                    }
                }
            }
            return true;
        }

     
    }
}
