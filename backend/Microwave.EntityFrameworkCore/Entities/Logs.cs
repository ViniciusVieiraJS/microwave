public class Log
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string Level { get; set; }
    public string Message { get; set; }
    public string Exception { get; set; }
    public string? StackTrace { get; set; }
    public string? InnerException { get; set; }
}
