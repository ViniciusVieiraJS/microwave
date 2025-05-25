using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microwave.Core.Exceptions;

[Route("api/microwave")]
[ApiController]
[Authorize]
public class MicrowaveHeatingController : ControllerBase
{

    private readonly IMicrowaveHeatingService _microwaveHeatingService;
    public MicrowaveHeatingController(IMicrowaveHeatingService microwaveHeatingService)
    {
        _microwaveHeatingService = microwaveHeatingService;
    }

    [HttpPost("start")]
    public async Task<IActionResult> StartHeating([FromBody] CreateMicrowaveHeatingDto heatingDto)
    {
        try
        {
            var result = await _microwaveHeatingService.StartHeatingAsync(heatingDto);
            return Ok(result);
        }
        catch (MicrowaveException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
    }

    [HttpPut("pause")]
    public async Task<IActionResult> PauseHeating([FromBody] UpdateMicrowaveHeatingDTO heatingDto)
    {
        try
        {
            var result = await _microwaveHeatingService.PauseHeatingAsync(heatingDto);
            return Ok();
        }
        catch (MicrowaveException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetHeatingStatus(int id)
    {
        try
        {
            var result = await _microwaveHeatingService.GetHeatingStatusAsync(id);
            return Ok(result);
        }
        catch (MicrowaveException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
    }

    [HttpDelete("cancel")]
    public async Task<IActionResult> StopHeating(int id)
    {
        try
        {
            await _microwaveHeatingService.CancelHeatingAsync(id);
            return NoContent();
        }
        catch (MicrowaveException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
    }

    [HttpPut("increase30seconds")]
    public async Task<IActionResult> IncreaseTime([FromBody] UpdateMicrowaveHeatingDTO heatingDto)
    {
        try
        {
            var result = await _microwaveHeatingService.Increase30Seconds(heatingDto);
            return Ok(result);
        }
        catch (MicrowaveException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
    }
   


}