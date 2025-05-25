using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microwave.Core;
using Microwave.Core.DTOs;
using Microwave.Core.Exceptions;
using Microwave.Core.Services;

namespace Microwave.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly MicrowaveDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(MicrowaveDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AuthResponseDTO> LoginAsync(LoginDTO model)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == model.Username);
            if(user == null)
            {
                throw new MicrowaveException("Invalid username or password", HttpStatusCode.Unauthorized);
            }

            var token = GenerateJwtToken(user);

            return new AuthResponseDTO
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddHours(1)
            };
        }

        public async Task<bool> RegisterUserAsync(string username, string password)
        {
            if (await _context.Users.AnyAsync(u => u.Username == username))
            {
                return false;
            }

            var user = new User
            {
                Username = username,
                PasswordHash = User.HashPassword(password)
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return true;
        }

        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}