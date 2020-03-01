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
    }
}
