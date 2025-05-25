namespace Microwave.Core.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> LoginAsync(LoginDTO model);
        Task<bool> RegisterUserAsync(string username, string password);
        string GenerateJwtToken(User user);
    }
}