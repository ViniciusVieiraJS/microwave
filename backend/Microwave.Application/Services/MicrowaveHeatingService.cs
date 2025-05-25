
using System.Net;
using Microwave.Core.Exceptions;

public class MicrowaveHeatingService : IMicrowaveHeatingService
{
    private readonly IMicrowaveHeatingRepository _microwaveHeatingRepository;

    public MicrowaveHeatingService(IMicrowaveHeatingRepository microwaveHeatingRepository)
    {
        _microwaveHeatingRepository = microwaveHeatingRepository;
    }

    public Task CancelHeatingAsync(int id)
    {
        return _microwaveHeatingRepository.CancelHeating(id);
    }

    public Task<string> GetFormattedTimeAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<GetMicrowaveHeatingDTO> GetHeatingStatusAsync(int id)
    {
        var heating = await _microwaveHeatingRepository.GetHeatingStatusAsync(id);

        if (heating == null)
        {
            throw new MicrowaveException("Heating not found", HttpStatusCode.NotFound);
        }

       
            return new GetMicrowaveHeatingDTO
            {
                Id = heating.Id,
                IsPaused = heating.IsPaused,
                InHeating = heating.InHeating,
                TimeInSeconds = heating.TimeInSeconds,
                PowerLevel = heating.PowerLevel,
                TimeHasStarted = heating.TimeHasStarted,
                FromPreDefinedProgram = heating.FromPreDefinedProgram,
                HeatingCharacter = heating.HeatingCharacter,
                HeatingString = heating.HeatingString,
                FormattedSeconds = heating.FormattedSeconds,
                CurrentInput = heating.CurrentInput
            };
        }
    
    

    public Task<int> GetRemainingTimeAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<GetMicrowaveHeatingDTO> Increase30Seconds(UpdateMicrowaveHeatingDTO heatingDto)
    {
        var heating = await _microwaveHeatingRepository.Increase30Seconds(heatingDto);
        if (heating == null)
        {
            throw new MicrowaveException("Heating not found", HttpStatusCode.NotFound);
        }
        var getHeating = new GetMicrowaveHeatingDTO
        {
            Id = heating.Id,
            IsPaused = heating.IsPaused,
            InHeating = heating.InHeating,
            TimeInSeconds = heating.TimeInSeconds,
            PowerLevel = heating.PowerLevel,
            TimeHasStarted = heating.TimeHasStarted,
            FromPreDefinedProgram = heating.FromPreDefinedProgram,
            HeatingCharacter = heating.HeatingCharacter,
            HeatingString = heating.HeatingString,
            FormattedSeconds = heating.FormattedSeconds,
            CurrentInput = heating.CurrentInput
        };
        return getHeating;
    }

    public Task<bool> IsHeatingAsync()
    {
        throw new NotImplementedException();
    }

    public Task<bool> IsPausedAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<GetMicrowaveHeatingDTO> PauseHeatingAsync(UpdateMicrowaveHeatingDTO heatingDto)
    {

        var heating = await _microwaveHeatingRepository.PauseHeatingAsync(heatingDto);

        if (heating == null)
        {
            throw new MicrowaveException("Heating not found", HttpStatusCode.NotFound);
        }
        var getHeating = new GetMicrowaveHeatingDTO
        {
            Id = heating.Id,
            IsPaused = heating.IsPaused,
            InHeating = heating.InHeating,
            TimeInSeconds = heating.TimeInSeconds,
            PowerLevel = heating.PowerLevel,
            TimeHasStarted = heating.TimeHasStarted,
            FromPreDefinedProgram = heating.FromPreDefinedProgram,
            HeatingCharacter = heating.HeatingCharacter,
            HeatingString = heating.HeatingString,
            FormattedSeconds = heating.FormattedSeconds,
            CurrentInput = heating.CurrentInput
        };

        return getHeating;

    }

    public Task ResumeHeatingAsync()
    {
        throw new NotImplementedException();
    }

    public Task<MicrowaveHeating> StartHeatingAsync(CreateMicrowaveHeatingDto heatingDto)
    {  
        return _microwaveHeatingRepository.StartHeatingAsync(heatingDto);
    }
    
    public Task StopHeatingAsync()
    {
        throw new NotImplementedException();
    }
}