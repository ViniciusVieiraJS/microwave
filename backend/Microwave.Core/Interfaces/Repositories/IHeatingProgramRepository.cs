namespace Microwave.Core.Interfaces.Repositories
{
    using Microwave.Core.DTOs;
    using Microwave.Core.Models;

    public interface IHeatingProgramRepository
    {
        Task<List<HeatingProgram>> GetAllHeatingProgramsAsync();
        Task<HeatingProgram> GetHeatingProgramByIdAsync(int id);
        Task<HeatingProgram> CreateHeatingProgramAsync(CreateHeatingProgramDTO heatingProgram);
        Task<bool> UpdateHeatingProgramAsync(int id, CreateHeatingProgramDTO heatingProgram);
        Task<bool> DeleteHeatingProgramAsync(int id);
    }
}