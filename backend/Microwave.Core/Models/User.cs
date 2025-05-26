using System;
using System.Security.Cryptography;
using System.Text;

namespace Microwave.Core
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        
        public static string HashPassword(string password)
        {
            var hash = SHA1.HashData(Encoding.UTF8.GetBytes(password));
            return string.Concat(hash.Select(b => b.ToString("x2")));
        }
    }
}