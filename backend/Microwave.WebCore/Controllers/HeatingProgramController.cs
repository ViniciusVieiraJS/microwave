namespace Microwave.WebCore.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microwave.Core.DTOs;
    using Microwave.Core.Exceptions;
    using Microwave.Core.Services;

    [Route("api/heating-programs")]
    [ApiController]
    [Authorize]
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
            if (heatingPrograms == null || heatingPrograms.Count == 0)
            {
                return NoContent();
            }
            return Ok(heatingPrograms);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetHeatingProgramById(int id)
        {
            try
            {
                var heatingProgram = await _heatingProgramService.GetHeatingProgramByIdAsync(id);
                return Ok(heatingProgram);
            }
            catch (MicrowaveException ex)
            {
                return StatusCode((int)ex.StatusCode, ex.Message);
            }

        }
        [HttpPost]
        public async Task<IActionResult> CreateHeatingProgram([FromBody] CreateHeatingProgramDTO heatingProgram)
        {
            try
            {
                var createdHeatingProgram = await _heatingProgramService.CreateHeatingProgramAsync(heatingProgram);
                return CreatedAtAction(nameof(GetHeatingProgramById), new { id = createdHeatingProgram.Id }, createdHeatingProgram);
            }
            catch (MicrowaveException ex)
            {
                return StatusCode((int)ex.StatusCode, ex.Message);
            }



        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHeatingProgram(int id)
        {
            try
            {
                await _heatingProgramService.DeleteHeatingProgramAsync(id);
                return NoContent();
            }
            catch (MicrowaveException ex)
            {
                return StatusCode((int)ex.StatusCode, ex.Message);
            }

        }

    }
}