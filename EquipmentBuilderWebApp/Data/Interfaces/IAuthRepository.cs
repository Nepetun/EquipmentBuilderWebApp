﻿using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface IAuthRepository
    {

        Task<Users> Register(Users user, string password);

        Task<Users> Login(string userName, string password);

        Task<bool> UserExists(string userName);

        Task<bool> ModifyUserName(int userId, string userName);
        Task<bool> ChangePassword(UserPasswordModify userPass);
        Task<bool> IsAdmin(int userId);
    }
}