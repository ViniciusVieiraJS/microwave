public class GetMicrowaveHeatingDTO
{
    public int Id { get; set; }
    public int PowerLevel { get; set; }
    public int Duration { get; set; }
    public int TimeInSeconds { get; set; }
    public bool InHeating { get; set; }
    public bool IsPaused { get; set; }
    public bool TimeHasStarted { get; set; }
    public bool FromPreDefinedProgram { get; set; }
    public string HeatingCharacter { get; set; } = string.Empty;
    public string HeatingString { get; set; } = string.Empty;
    public string FormattedSeconds { get; set; } = string.Empty;
    public string CurrentInput { get; set; } = string.Empty;
}