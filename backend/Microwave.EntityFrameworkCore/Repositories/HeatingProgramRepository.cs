using Microsoft.EntityFrameworkCore;
using Microwave.Core;
using Microwave.Core.DTOs;
using Microwave.Core.Interfaces.Repositories;
using Microwave.Core.Models;

namespace Microwave.EntityFrameworkCore.Repositories;

public class HeatingProgramRepository : IHeatingProgramRepository
{
    private readonly MicrowaveDbContext _context;
    public HeatingProgramRepository(MicrowaveDbContext context)
    {
        _context = context;
    }

   
    public async Task<HeatingProgram> CreateHeatingProgramAsync(CreateHeatingProgramDTO heatingProgram)
    {
        var newHeatingProgram = new HeatingProgram
        {
            Name = heatingProgram.Name,
            Food = heatingProgram.Food,
            PowerLevel = heatingProgram.PowerLevel,
            Duration = heatingProgram.Duration,
            HeatingCharacter = heatingProgram.HeatingCharacter
        };

        await _context.HeatingPrograms.AddAsync(newHeatingProgram);
        await _context.SaveChangesAsync();

        return newHeatingProgram;
    }

    public Task<bool> DeleteHeatingProgramAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<List<HeatingProgram>> GetAllHeatingProgramsAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<HeatingProgram> GetHeatingProgramByIdAsync(int id)
    {
        var heatingProgram = await _context.HeatingPrograms.FirstOrDefaultAsync(h => h.Id == id);
        return heatingProgram;
    }

    public Task<bool> UpdateHeatingProgramAsync(int id, CreateHeatingProgramDTO heatingProgram)
    {
        throw new NotImplementedException();
    }
}