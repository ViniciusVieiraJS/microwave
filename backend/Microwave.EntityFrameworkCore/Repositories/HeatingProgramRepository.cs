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
        var existingHeatingProgram = await _context.HeatingPrograms.ToListAsync();
        if (existingHeatingProgram.Any(h => h.HeatingCharacter == heatingProgram.HeatingCharacter))
        {
            throw new Exception("Heating program with the same heating character already exists.");
        }
        var newHeatingProgram = new HeatingProgram
        {
            Name = heatingProgram.Name,
            Food = heatingProgram.Food,
            PowerLevel = heatingProgram.PowerLevel,
            Duration = heatingProgram.Duration,
            HeatingCharacter = heatingProgram.HeatingCharacter,
            ComplementaryInformation = heatingProgram.ComplementaryInformation
        };

        await _context.HeatingPrograms.AddAsync(newHeatingProgram);
        await _context.SaveChangesAsync();

        return newHeatingProgram;
    }

    public async Task<bool> DeleteHeatingProgramAsync(int id)
    {
        var heatingProgram = await _context.HeatingPrograms.FirstOrDefaultAsync(h => h.Id == id);
        if (heatingProgram == null)
        {
            return false;
        }

        _context.HeatingPrograms.Remove(heatingProgram);
        await _context.SaveChangesAsync();
        return true;
    }

    public Task<List<HeatingProgram>> GetAllHeatingProgramsAsync()
    {
        var heatingPrograms = _context.HeatingPrograms.ToListAsync();
        return heatingPrograms;
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