using Microwave.Application.Mappers;
using Microwave.Core.DTOs;
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
        var createdHeatingProgram = await _heatingProgramRepository.CreateHeatingProgramAsync(heatingProgram);
        if (createdHeatingProgram == null)
        {
            throw new Exception("Failed to create heating program");
        }
        var getHeatingProgram = HeatingProgramMapper.MapToGetHeatingProgramDTO(createdHeatingProgram);
        return getHeatingProgram;
    }

    public Task<bool> DeleteHeatingProgramAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<List<GetHeatingProgramDTO>> GetAllHeatingProgramsAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<GetHeatingProgramDTO> GetHeatingProgramByIdAsync(int id)
    {
        var heatingProgram = await _heatingProgramRepository.GetHeatingProgramByIdAsync(id);

        var getHeatingProgram = HeatingProgramMapper.MapToGetHeatingProgramDTO(heatingProgram);

        return getHeatingProgram;
    }

    public Task<bool> UpdateHeatingProgramAsync(int id, CreateHeatingProgramDTO heatingProgram)
    {
        throw new NotImplementedException();
    }
}