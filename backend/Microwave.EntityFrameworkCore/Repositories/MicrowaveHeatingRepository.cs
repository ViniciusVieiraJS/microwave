using Microsoft.EntityFrameworkCore;
using Microwave.Core;

public class MicrowaveHeatingRepository : IMicrowaveHeatingRepository
{
    private readonly MicrowaveDbContext _context;

    public MicrowaveHeatingRepository(MicrowaveDbContext context)
    {
        _context = context;
    }

    public Task CancelHeating(int id)
    {
        var microwaveHeating = _context.MicrowaveHeatings.FirstOrDefaultAsync(m => m.Id == id);
      
        _context.MicrowaveHeatings.Remove(microwaveHeating.Result);
        return _context.SaveChangesAsync();
    }

    public Task<string> GetFormattedTimeAsync()
    {
        throw new NotImplementedException();
    }

    public Task<MicrowaveHeating> GetHeatingStatusAsync(int id)
    {
        var microwaveHeating = _context.MicrowaveHeatings.FirstOrDefaultAsync(m => m.Id == id);
       
        return microwaveHeating;
    }

    public Task<int> GetRemainingTimeAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<MicrowaveHeating> Increase30Seconds(UpdateMicrowaveHeatingDTO heatingDto)
    {
        var microwaveHeating = await _context.MicrowaveHeatings.FirstOrDefaultAsync(m => m.Id == heatingDto.Id);
        
        microwaveHeating.TimeInSeconds = heatingDto.TimeInSeconds;
        microwaveHeating.FormattedSeconds = heatingDto.FormattedSeconds;
    
        await _context.SaveChangesAsync();
        return microwaveHeating;
    }

    public Task<bool> IsHeatingAsync()
    {
        throw new NotImplementedException();
    }

    public Task<bool> IsPausedAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<MicrowaveHeating> PauseHeatingAsync(UpdateMicrowaveHeatingDTO heatingDto)
{
    var microwaveHeating = await _context.MicrowaveHeatings.FindAsync(heatingDto.Id); 

    microwaveHeating.IsPaused = true;
    microwaveHeating.InHeating = false;
    microwaveHeating.TimeInSeconds = heatingDto.TimeInSeconds;
    microwaveHeating.PowerLevel = heatingDto.PowerLevel;
    microwaveHeating.TimeHasStarted = heatingDto.TimeHasStarted;
    microwaveHeating.FromPreDefinedProgram = heatingDto.FromPreDefinedProgram;
    microwaveHeating.HeatingCharacter = heatingDto.HeatingCharacter;
    microwaveHeating.HeatingString = heatingDto.HeatingString;
    microwaveHeating.FormattedSeconds = heatingDto.FormattedSeconds;
    microwaveHeating.CurrentInput = heatingDto.CurrentInput;

    await _context.SaveChangesAsync();

    return microwaveHeating;
}
   

    public Task ResumeHeatingAsync()
    {
        throw new NotImplementedException();
    }

    public Task<MicrowaveHeating> StartHeatingAsync(CreateMicrowaveHeatingDto heatingDto)
    {
       var microwaveHeating = new MicrowaveHeating
       {

           IsPaused = false,
           InHeating = true,
           TimeInSeconds = heatingDto.TimeInSeconds,
           PowerLevel = heatingDto.PowerLevel,
           TimeHasStarted = heatingDto.TimeHasStarted,
           FromPreDefinedProgram = heatingDto.FromPreDefinedProgram,
           HeatingCharacter = heatingDto.HeatingCharacter,
           HeatingString = heatingDto.HeatingString,
           FormattedSeconds = heatingDto.FormattedSeconds,
           CurrentInput = heatingDto.CurrentInput
        };

        _context.MicrowaveHeatings.Add(microwaveHeating);
        return _context.SaveChangesAsync().ContinueWith(t => microwaveHeating);
    }
    

    public Task StopHeatingAsync()
    {
        throw new NotImplementedException();
    }
}