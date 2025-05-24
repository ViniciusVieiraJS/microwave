using Microwave.Core;
using Microsoft.EntityFrameworkCore;
using Microwave.Core.Interfaces.Repositories;
using Microwave.EntityFrameworkCore.Repositories;
using Microwave.Core.Services;
using Microwave.Application.Services;



var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddScoped<LogService>();

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});


builder.Services.AddDbContext<MicrowaveDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

    builder.Services.AddScoped<IHeatingProgramRepository, HeatingProgramRepository>();
builder.Services.AddScoped<IHeatingProgramService, HeatingProgramService>();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseMiddleware<GlobalExceptionMiddleware>();



app.UseCors("AllowAllOrigins");
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.UseHttpsRedirection();



app.Run();

