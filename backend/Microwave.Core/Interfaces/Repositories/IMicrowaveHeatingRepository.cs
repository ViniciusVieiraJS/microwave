public interface IMicrowaveHeatingRepository{
    Task<MicrowaveHeating> StartHeatingAsync(CreateMicrowaveHeatingDto heatingDto);
    Task<MicrowaveHeating> PauseHeatingAsync(UpdateMicrowaveHeatingDTO heatingDto);
    Task ResumeHeatingAsync();
    Task StopHeatingAsync();
    Task<bool> IsHeatingAsync();
    Task<bool> IsPausedAsync();
    Task<int> GetRemainingTimeAsync();
    Task<string> GetFormattedTimeAsync();
    Task<MicrowaveHeating> GetHeatingStatusAsync(int id);
    Task CancelHeating(int id);
    Task<MicrowaveHeating> Increase30Seconds(UpdateMicrowaveHeatingDTO heatingDto);
}