﻿using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Context;
using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using Microsoft.AspNetCore.Mvc;
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


        public async Task<List<EquipmentListDto>> ListMyEquipments(PageParams pageParams, int userId)
        {
            List<EquipmentListDto> lstEquipments = new List<EquipmentListDto>();

            //pobranie grup uzytkownika
            var userGroups = _context.UserToGroups.Where(x => x.UserId == userId).ToList();
            if (userGroups.Count > 0)
            {
                //pobranie ekwipunkow udostępnionych dla grup użytkowników
                foreach (UserToGroups groupId in _context.UserToGroups.Where(x => x.UserId == userId).ToList())
                {
                    foreach (EquipmentsToGroup eqToGroup in _context.EquipmentsToGroup.Where(x => x.GroupId == groupId.GroupId).ToList())
                    {
                        if (await _context.Equipments.AnyAsync(x => x.Id == eqToGroup.EquipmentId))
                        {
                            Equipments sharedEquipment = await _context.Equipments.FirstOrDefaultAsync(x => x.Id == eqToGroup.EquipmentId);

                            // pobranie nazwy bohatera dla ekwipunku
                            var hero = await _context.Heroes.FirstOrDefaultAsync(x => x.Id == sharedEquipment.HeroId);
                            // pobranie poziomu bohatera dla ekwipunku
                            var heroLvl = await _context.UserHeroesLvl.FirstOrDefaultAsync(x => x.EquipmentId == sharedEquipment.Id);
                            // pobranie ilości lajków dla ekwipunku
                            var counterOfLikes = await _context.Likes.CountAsync(x => x.EquipmentId == sharedEquipment.Id);

                            // pobranie nazwy użytkownika
                            var userName = await _context.Users.FirstOrDefaultAsync(x => x.Id == sharedEquipment.UserId);

                            var eqWithoutShared = new EquipmentListDto()
                            {
                                EquipmentId = sharedEquipment.Id,
                                EqName = sharedEquipment.EqName,
                                HeroName = hero.HeroName,
                                HeroLvl = (int)heroLvl.Lvl,
                                CounterOfLikes = counterOfLikes,
                                UserName = userName.UserName
                            };

                            lstEquipments.Add(eqWithoutShared);
                        }
                    }
                }
            }
           

            foreach (Equipments eq in _context.Equipments.Where(x => x.UserId == userId).ToList())
            {
                if(!lstEquipments.Any(x=>x.EqName == eq.EqName))
                {
                    // pobranie nazwy bohatera dla ekwipunku
                    var hero = await _context.Heroes.FirstOrDefaultAsync(x => x.Id == eq.HeroId);
                    // pobranie poziomu bohatera dla ekwipunku
                    var heroLvl = await _context.UserHeroesLvl.FirstOrDefaultAsync(x => x.EquipmentId == eq.Id);
                    // pobranie ilości lajków dla ekwipunku
                    var counterOfLikes = await _context.Likes.CountAsync(x => x.EquipmentId == eq.Id);

                    // pobranie nazwy użytkownika
                    var userName = await _context.Users.FirstOrDefaultAsync(x => x.Id == eq.UserId);

                    var eqWithoutShared = new EquipmentListDto()
                    {
                        EquipmentId = eq.Id,
                        EqName = eq.EqName,
                        HeroName = hero.HeroName,
                        HeroLvl =(int)heroLvl.Lvl,
                        CounterOfLikes = counterOfLikes,
                        UserName = userName.UserName
                    };

                    lstEquipments.Add(eqWithoutShared);
                }
            }

            // dodanie ekwipunków samego użytkownika
            //var equipments = _context.Equipments.Where(x => x.UserId == userId).AsQueryable(); // pobranie ekwipunków użytkownika
           // return await PagedList<EquipmentListDto>.CreateAsync(querableEq, pageParams.PageNumber, pageParams.PageSize);
            return await PagedList<EquipmentListDto>.Create(lstEquipments, pageParams.PageNumber, pageParams.PageSize);
           // return querableEq;
        }

        
        public async Task<Equipments> UpdateEquipment(Equipments equipment, int heroLvl, int equipmentId)
        {
            equipment.Id = equipmentId;

            _context.Equipments.Update(equipment);

            var eqHeroLvlExisting = await _context.UserHeroesLvl.FirstOrDefaultAsync(x => x.EquipmentId == equipmentId);

            eqHeroLvlExisting.HeroId = equipment.HeroId;
            eqHeroLvlExisting.UserId = equipment.UserId;
            eqHeroLvlExisting.Lvl = heroLvl;
            eqHeroLvlExisting.EquipmentId = equipmentId;

            _context.UserHeroesLvl.Update(eqHeroLvlExisting);

            await _context.SaveChangesAsync();

            return equipment;

        }
        public async Task<Equipments> AddEquipment(Equipments equipment, int heroLvl)
        {
            // generowanie zestawienia ekwipunku
            await _context.Equipments.AddAsync(equipment);

            await _context.SaveChangesAsync();

            // generowanie ewkipunku do poziomu bohatera 
            int id = equipment.Id;

            var eqHeroLvl = new UserHeroesLvl
            {
                HeroId = equipment.HeroId,
                UserId = equipment.UserId,
                Lvl = heroLvl,
                EquipmentId = id
            };

            await _context.UserHeroesLvl.AddAsync(eqHeroLvl);

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

        public async Task<bool> ValidateEquipmentNameForUpdate(string equipmentName, int userId, int equipmentId)
        {
            if (await _context.Equipments.AnyAsync(x => x.UserId == userId && x.EqName == equipmentName && x.Id != equipmentId))
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

                            var eqWithoutShared = new Equipments()
                            {
                                Id = sharedEquipment.Id,
                                EqName = sharedEquipment.EqName,
                                FirtItemId = sharedEquipment.FirtItemId,
                                SecondItemId = sharedEquipment.SecondItemId,
                                ThirdItemId = sharedEquipment.ThirdItemId,
                                FourthItemId = sharedEquipment.FourthItemId,
                                FifthItemId = sharedEquipment.FifthItemId,
                                SixthItemId = sharedEquipment.SixthItemId,
                                HeroId = sharedEquipment.HeroId,
                                Likes = sharedEquipment.Likes,
                                Comments = sharedEquipment.Comments,
                                UserId = sharedEquipment.UserId
                            };

                            lstEquipments.Add(eqWithoutShared);
                        }                        
                    }                   
                }

                return lstEquipments;
            }
            return new List<Equipments>();
        }


        public async Task<Equipments> ShareEquipment(ShareEquipmentDto euqipmentToShare)
        {
            // wysharowanie ekwipunku
            var eqToShare = await _context.Equipments.FirstOrDefaultAsync(x => x.Id == euqipmentToShare.EquipmentId);

            var eqShared = new EquipmentsToGroup()
            {
                EquipmentId = euqipmentToShare.EquipmentId,
                GroupId = euqipmentToShare.GroupId
            };
            
            await _context.EquipmentsToGroup.AddAsync(eqShared);

            await _context.SaveChangesAsync();

            return eqToShare;
        }


        public async Task<bool> CheckThatEqWasShared(int equipmentId, int groupId)
        {
            if (await _context.EquipmentsToGroup.AnyAsync(x => x.EquipmentId == equipmentId && x.GroupId == groupId))
                return true;

            return false;
        }


        /// <summary>
        /// sprawdzanie czy uzytkownik posiada wysharowane ekwipunki
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
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

        public async Task<EquipmentDto> GetEquipmentById(int equipmentId)
        {
            var eq = await _context.Equipments.FirstOrDefaultAsync(x => x.Id == equipmentId);
            var herloLvl = await _context.UserHeroesLvl.FirstOrDefaultAsync(x => x.EquipmentId == eq.Id);

            var eqToGet = new EquipmentDto
            {
                EqName = eq.EqName,
                HeroId = eq.HeroId,
                HeroLvl = (int)herloLvl.Lvl,
                FirtItemId = eq.FirtItemId,
                SecondItemId = eq.SecondItemId,
                ThirdItemId = eq.ThirdItemId,
                FourthItemId = eq.FourthItemId,
                FifthItemId = eq.FifthItemId,
                SixthItemId = eq.SixthItemId
            };


            return eqToGet;
        }
    }
}
