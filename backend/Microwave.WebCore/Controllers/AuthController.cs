using Microsoft.AspNetCore.Mvc;
using Microwave.Core.Exceptions;
using Microwave.Core.Services;


namespace Microwave.WebCore.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _authService.LoginAsync(model);


                return Ok(result);
            }
            catch (MicrowaveException ex)
            {
                return StatusCode((int)ex.StatusCode, ex.Message);
            
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginDTO model)
        {
            if (string.IsNullOrEmpty(model.Username) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest("Nome de usuário e senha são obrigatórios");
            }

            var result = await _authService.RegisterUserAsync(model.Username, model.Password);
            if (!result)
            {
                return BadRequest("Nome de usuário já existe");
            }

            return Ok(new { message = "Usuário registrado com sucesso" });

        }
    }
}