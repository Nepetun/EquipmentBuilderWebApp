using System;
using System.Threading.Tasks;
using EquipmentBuilder.API.Context;
using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EquipmentBuilder.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        
        public readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Users> Login(string userName, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            //tutaj przekazujemy haslo podane przez użytkownika
            //hasz oraz sól
            //sól bedzie parametrem przekazywanym do HMAC a computed hash bedzie
            //mial wartosc haszu dla wpisanego przez uzytkownika hasła
            //następnie musimy tylko porównać hasze metoda
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));//dzieki temu mamy haslo przekazane do metody jako byte array
                //porownanie kolejnej wartosci haszu dla wpisaego przez użytkownika hasła
                //oraz dla tego otrzymanego z bazy przypisanego dla użytkownika przy rejestracji
                for (int i = 0; i < computedHash.Length; i++)
                {
                    //jeżeli jakiekolwie zestawienie haszu nie jest równe kończymy sprawdzanie
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        public async Task<Users> Register(Users user, string password)
        {
            //
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt); //jezeli updatowane w metodzie dzieki out rowniez sa tutaj updatowane
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;


            await _context.Users.AddAsync(user);

            await _context.SaveChangesAsync();
            return user;

        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            //metoda wykorzystywana do haszowania i saltowania hasła + posiada dispose wiec mozna dac using
            //co za tym idzie dzieki temu mamy pewnosc ze nie zostawimy sladu bo po wykonaniu wszystkie wykorzystane zasoby zostana zwolnione
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));//dzieki temu mamy haslo przekazane do metody jako byte array
            }
        }

        public async Task<bool> UserExists(string userName)
        {
            if (await _context.Users.AnyAsync(x => x.UserName == userName))
                return true;

            return false;
        }

        public async Task<bool> ModifyUserName(int userId, string userName)
        {
            var userToModify = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);


            userToModify.UserName = userName;

            //byte[] passwordHash, passwordSalt;
            //CreatePasswordHash(password, out passwordHash, out passwordSalt); //jezeli updatowane w metodzie dzieki out rowniez sa tutaj updatowane
            //userToModify.PasswordHash = passwordHash;
            //userToModify.PasswordSalt = passwordSalt;


            _context.Users.Update(userToModify);

            await _context.SaveChangesAsync();

            return true;
        }

    }
}