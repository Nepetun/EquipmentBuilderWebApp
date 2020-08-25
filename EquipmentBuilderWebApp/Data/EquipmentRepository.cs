using EquipmentBuilder.API.Common;
using EquipmentBuilder.API.Common.Filters;
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


        //public async Task<List<EquipmentListDto>> ListMyEquipments(PageParams pageParams, int userId)
        public async Task<PagedList<EquipmentListDto>> ListMyEquipments(PageParams pageParams, int userId, EquipmentFilter eqFilters, bool isAdmin)
        {
            List<EquipmentListDto> lstEquipments = new List<EquipmentListDto>();


            if (isAdmin)
            {
                foreach (Equipments eq in await _context.Equipments.Where(x => x.UserId == userId || isAdmin).ToListAsync())
                {
                    if (!lstEquipments.Any(x => x.EqName == eq.EqName))
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
                            HeroLvl = heroLvl != null ? 1 : (int)heroLvl.Lvl,
                            CounterOfLikes = counterOfLikes,
                            UserName = userName.UserName
                        };

                        lstEquipments.Add(eqWithoutShared);
                    }
                }
            }
            else
            {
                //pobranie grup uzytkownika
                var userGroups = await _context.UserToGroups.Where(x => x.UserId == userId).ToListAsync();
                if (userGroups.Count > 0)
                {
                    //pobranie ekwipunkow udostępnionych dla grup użytkowników
                    foreach (UserToGroups groupId in await _context.UserToGroups.Where(x => x.UserId == userId).ToListAsync())
                    {
                        foreach (EquipmentsToGroup eqToGroup in await _context.EquipmentsToGroup.Where(x => x.GroupId == groupId.GroupId).ToListAsync())
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


                foreach (Equipments eq in await _context.Equipments.Where(x => x.UserId == userId).ToListAsync())
                {
                    if (!lstEquipments.Any(x => x.EqName == eq.EqName))
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
                            HeroLvl = (int)heroLvl.Lvl,
                            CounterOfLikes = counterOfLikes,
                            UserName = userName.UserName
                        };

                        lstEquipments.Add(eqWithoutShared);
                    }
                }


              
            }

            // dodanie ekwipunków samego użytkownika
            //var equipments = _context.Equipments.Where(x => x.UserId == userId).AsQueryable(); // pobranie ekwipunków użytkownika
            // return await PagedList<EquipmentListDto>.CreateAsync(querableEq, pageParams.PageNumber, pageParams.PageSize);

            if (eqFilters != null)
            {
                lstEquipments = lstEquipments.Where(x => x.HeroLvl >= eqFilters.HeroLvlFrom && x.HeroLvl <= eqFilters.HeroLvlTo).ToList();

                if (eqFilters.EquipmentNameLike != null)
                {
                    lstEquipments = lstEquipments.Where(x => x.EqName.ToLower().Contains(eqFilters.EquipmentNameLike.ToLower())).ToList();
                }

                if (eqFilters.UserNameLike != null)
                {
                    lstEquipments = lstEquipments.Where(x => x.UserName.ToLower().Contains(eqFilters.UserNameLike.ToLower())).ToList();
                }

                if (eqFilters.HeroNameLike != null)
                {
                    lstEquipments = lstEquipments.Where(x => x.HeroName.ToLower().Contains(eqFilters.HeroNameLike.ToLower())).ToList();
                }
            }

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
        public async Task<bool> DeleteShareEquipment(int equipmentId, int groupId)
        {
            try
            {
                EquipmentsToGroup etg = await _context.EquipmentsToGroup.FirstOrDefaultAsync(x => x.EquipmentId == equipmentId && x.GroupId == groupId);

                _context.EquipmentsToGroup.Remove(etg);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return true;
        }


        public async Task<bool> DeleteEquipment(int equipmentId)
        {
            Equipments eq = await _context.Equipments.FirstOrDefaultAsync(x => x.Id == equipmentId);
            if (eq == null)
                return false;
            try
            {
                _context.Equipments.Remove(eq);

                // kasowanie komentarzy dla ekwipunku
                List<Comments> lstComments = new List<Comments>();
                lstComments = await _context.Comments.Where(x => x.EquipmentId == equipmentId).ToListAsync();
                foreach (Comments com in lstComments)
                {
                    _context.Comments.Remove(com);
                }

                // kasowanie przypisania ekwipunku dla grup
                List<EquipmentsToGroup> lstEqToGroup = new List<EquipmentsToGroup>();
                lstEqToGroup = await _context.EquipmentsToGroup.Where(x => x.EquipmentId == equipmentId).ToListAsync();
                foreach (EquipmentsToGroup etg in lstEqToGroup)
                {
                    _context.EquipmentsToGroup.Remove(etg);
                }

                // kasowanie lajkow dla ekwipunku
                List<Likes> lstLikes = new List<Likes>();
                lstLikes = await _context.Likes.Where(x => x.EquipmentId == equipmentId).ToListAsync();
                foreach (Likes lik in lstLikes)
                {
                    _context.Likes.Remove(lik);
                }

                // kasowanie user hero lvl dla ekwipunku
                List<UserHeroesLvl> lstHero = new List<UserHeroesLvl>();
                lstHero = await _context.UserHeroesLvl.Where(x => x.EquipmentId == equipmentId).ToListAsync();
                foreach (UserHeroesLvl uhl in lstHero)
                {
                    _context.UserHeroesLvl.Remove(uhl);
                }



                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                throw;
            }


            return true;
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
        public async Task<IEnumerable<SharedEquipmentInformation>> ListSharedEquipments(int userId) //, int groupIdVal
        {


            List<SharedEquipmentInformation> lstEquipments = new List<SharedEquipmentInformation>();
            //pobranie ekwipunkow udostępnionych dla grup użytkowników
            foreach (UserToGroups groupId in await _context.UserToGroups.Where(x => x.UserId == userId).ToListAsync()) // && x.GroupId == groupIdVal
            {
                foreach (EquipmentsToGroup eqToGroup in await _context.EquipmentsToGroup.Where(x => x.GroupId == groupId.GroupId).ToListAsync())
                {
                    if (await _context.Equipments.AnyAsync(x => x.Id == eqToGroup.EquipmentId))
                    {
                        Equipments sharedEquipment = await _context.Equipments.FirstOrDefaultAsync(x => x.Id == eqToGroup.EquipmentId);
                        Groups grp = await _context.Groups.FirstOrDefaultAsync(x => x.Id == groupId.GroupId);

                        var eqShared = new SharedEquipmentInformation()
                        {
                            EquipmentId = sharedEquipment.Id,
                            EquipmentName = sharedEquipment.EqName,
                            GroupId = (int)groupId.GroupId,
                            GroupName = grp.GroupName
                        };

                        lstEquipments.Add(eqShared);
                    }
                }
            }

            return lstEquipments;

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
