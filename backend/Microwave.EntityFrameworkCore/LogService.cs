using Microwave.Core;

public class LogService
{
    private readonly MicrowaveDbContext _context;

    public LogService(MicrowaveDbContext context)
    {
        _context = context;
    }

    public async Task SaveExceptionAsync(Exception ex)
    {
        var log = new Log
        {
            Message = ex.Message,
            StackTrace = ex.StackTrace,
            Timestamp = DateTime.UtcNow,
            Exception = ex.GetType().Name,
            InnerException = ex.InnerException?.Message,
            Level = "Error"
        };

        _context.Logs.Add(log);
        await _context.SaveChangesAsync();
    }
    
}
