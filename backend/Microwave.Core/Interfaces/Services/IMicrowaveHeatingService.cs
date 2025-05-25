public interface IMicrowaveHeatingService
{
    Task<MicrowaveHeating> StartHeatingAsync(CreateMicrowaveHeatingDto heatingDto);
    Task<GetMicrowaveHeatingDTO> PauseHeatingAsync(UpdateMicrowaveHeatingDTO heatingDto);
    Task ResumeHeatingAsync();
    Task StopHeatingAsync();
    Task<bool> IsHeatingAsync();
    Task<bool> IsPausedAsync();
    Task<int> GetRemainingTimeAsync();
    Task<string> GetFormattedTimeAsync();
    Task<GetMicrowaveHeatingDTO> GetHeatingStatusAsync(int id);
    Task CancelHeatingAsync(int id);
    Task<GetMicrowaveHeatingDTO> Increase30Seconds(UpdateMicrowaveHeatingDTO heatingDto);
}