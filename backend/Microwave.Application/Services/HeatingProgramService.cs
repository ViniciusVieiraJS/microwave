using System.Net;
using Microwave.Application.Mappers;
using Microwave.Core.DTOs;
using Microwave.Core.Exceptions;
using Microwave.Core.Interfaces.Repositories;
using Microwave.Core.Services;

namespace Microwave.Application.Services;

public class HeatingProgramService : IHeatingProgramService
{

    private readonly IHeatingProgramRepository _heatingProgramRepository;

    public HeatingProgramService(IHeatingProgramRepository heatingProgramRepository)
    {
        _heatingProgramRepository = heatingProgramRepository;
    }

    public async Task<GetHeatingProgramDTO> CreateHeatingProgramAsync(CreateHeatingProgramDTO heatingProgram)
    {
        var heatingCharacterExists = await _heatingProgramRepository.HeatingCharacterExistsAsync(heatingProgram.HeatingCharacter);
        if (heatingCharacterExists)
        {
            throw new MicrowaveException("Heating character already exists", HttpStatusCode.Conflict);
        }
        
        var createdHeatingProgram = await _heatingProgramRepository.CreateHeatingProgramAsync(heatingProgram);
       
        var getHeatingProgram = HeatingProgramMapper.MapToGetHeatingProgramDTO(createdHeatingProgram);
        return getHeatingProgram;
    }

    public async Task<bool> DeleteHeatingProgramAsync(int id)
    {
        var deleted = await _heatingProgramRepository.DeleteHeatingProgramAsync(id);
        if (deleted == false)
        {
            throw new MicrowaveException("Failed to delete heating program", HttpStatusCode.NotFound);
        }
        return deleted;
    }

    public async Task<List<GetHeatingProgramDTO>> GetAllHeatingProgramsAsync()
    {
        var heatingPrograms = await _heatingProgramRepository.GetAllHeatingProgramsAsync();
        var getHeatingPrograms = new List<GetHeatingProgramDTO>();
        foreach (var heatingProgram in heatingPrograms)
        {
            var getHeatingProgram = HeatingProgramMapper.MapToGetHeatingProgramDTO(heatingProgram);
            getHeatingPrograms.Add(getHeatingProgram);
        }
        return getHeatingPrograms;
    }

    public async Task<GetHeatingProgramDTO> GetHeatingProgramByIdAsync(int id)
    {
        var heatingProgram = await _heatingProgramRepository.GetHeatingProgramByIdAsync(id);
        if (heatingProgram == null)
        {
            throw new MicrowaveException("Heating program not found", HttpStatusCode.NotFound);
        }

        var getHeatingProgram = HeatingProgramMapper.MapToGetHeatingProgramDTO(heatingProgram);

        return getHeatingProgram;
    }

    public Task<bool> UpdateHeatingProgramAsync(int id, CreateHeatingProgramDTO heatingProgram)
    {
        throw new NotImplementedException();
    }
}