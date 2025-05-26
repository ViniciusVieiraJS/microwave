using Microwave.Core.DTOs;
using Microwave.Core.Models;

namespace Microwave.Application.Mappers;

public class HeatingProgramMapper
{
    public static GetHeatingProgramDTO MapToGetHeatingProgramDTO(HeatingProgram heatingProgram)
    {
        if(heatingProgram == null)
        {
            return null;
        }
        return new GetHeatingProgramDTO
        {
            Id = heatingProgram.Id,
            Name = heatingProgram.Name,
            Food = heatingProgram.Food,
            PowerLevel = heatingProgram.PowerLevel,
            Duration = heatingProgram.Duration,
            HeatingCharacter = heatingProgram.HeatingCharacter,
            ComplementaryInformation = heatingProgram.ComplementaryInformation
        };
    }

    public static HeatingProgram MapToHeatingProgram(CreateHeatingProgramDTO createHeatingProgramDTO)
    {
        if(createHeatingProgramDTO == null)
        {
            return null;
        }
        return new HeatingProgram
        {
            Name = createHeatingProgramDTO.Name,
            Food = createHeatingProgramDTO.Food,
            PowerLevel = createHeatingProgramDTO.PowerLevel,
            Duration = createHeatingProgramDTO.Duration,
            HeatingCharacter = createHeatingProgramDTO.HeatingCharacter,
            ComplementaryInformation = createHeatingProgramDTO.ComplementaryInformation

        };
    }
}