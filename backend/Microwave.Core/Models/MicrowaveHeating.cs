public class MicrowaveHeating
{
        public int Id { get; set; }
    
        public int PowerLevel { get; set; }
        public int TimeInSeconds { get; set; }
        public bool InHeating { get; set; }
        public bool IsPaused { get; set; }
        public bool TimeHasStarted { get; set; }
        public bool FromPreDefinedProgram { get; set; }
        public string HeatingCharacter { get; set; }
        public string HeatingString { get; set; }
        public string FormattedSeconds { get; set; }
        public string CurrentInput { get; set; }
        
     
}