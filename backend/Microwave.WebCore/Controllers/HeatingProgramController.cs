namespace Microwave.WebCore.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microwave.Core.DTOs;
    using Microwave.Core.Services;

    [Route("api/[controller]")]
    [ApiController]
    public class HeatingProgramController : ControllerBase
    {
        private readonly IHeatingProgramService _heatingProgramService;

        public HeatingProgramController(IHeatingProgramService heatingProgramService)
        {
            _heatingProgramService = heatingProgramService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllHeatingPrograms()
        {
            var heatingPrograms = await _heatingProgramService.GetAllHeatingProgramsAsync();
            return Ok(heatingPrograms);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetHeatingProgramById(int id)
        {
            var heatingProgram = await _heatingProgramService.GetHeatingProgramByIdAsync(id);
            if (heatingProgram == null)
            {
                return NotFound();
            }
            return Ok(heatingProgram);
        }
        [HttpPost]
        public async Task<IActionResult> CreateHeatingProgram([FromBody] CreateHeatingProgramDTO heatingProgram)
        {
            if (heatingProgram == null)
            {
                return BadRequest();
            }
            var createdHeatingProgram = await _heatingProgramService.CreateHeatingProgramAsync(heatingProgram);
            return CreatedAtAction(nameof(GetHeatingProgramById), new { id = createdHeatingProgram.Id }, createdHeatingProgram);
        }

    }
}