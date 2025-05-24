namespace Microwave.Core.Services;

using Microwave.Core.DTOs;
using Microwave.Core.Models;


public interface IHeatingProgramService
{
    Task<List<GetHeatingProgramDTO>> GetAllHeatingProgramsAsync();
    Task<GetHeatingProgramDTO> GetHeatingProgramByIdAsync(int id);
    Task<GetHeatingProgramDTO> CreateHeatingProgramAsync(CreateHeatingProgramDTO heatingProgram);
    Task<bool> UpdateHeatingProgramAsync(int id, CreateHeatingProgramDTO heatingProgram);
    Task<bool> DeleteHeatingProgramAsync(int id);
}