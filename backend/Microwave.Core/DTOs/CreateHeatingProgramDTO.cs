namespace Microwave.Core.DTOs
{
    public class CreateHeatingProgramDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Food { get; set; } = string.Empty;
        public int PowerLevel { get; set; }
        public int Duration { get; set; }
        public string HeatingCharacter { get; set; } = string.Empty;
        public string ComplementaryInformation { get; set; } = string.Empty;
    }
}