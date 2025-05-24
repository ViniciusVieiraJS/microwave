using Microsoft.EntityFrameworkCore;
using Microwave.Core.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace Microwave.Core
{
    public class MicrowaveDbContext : DbContext
    {
        public MicrowaveDbContext()
        {
            
        }
        public MicrowaveDbContext(DbContextOptions<MicrowaveDbContext> options)
            : base(options)
        {
        }

        public DbSet<HeatingProgram> HeatingPrograms { get; set; } = null!;
        public DbSet<Log> Logs { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}