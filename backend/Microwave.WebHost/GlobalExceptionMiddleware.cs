using System.Text.Json;


public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IServiceProvider _serviceProvider;

    public GlobalExceptionMiddleware(RequestDelegate next, IServiceProvider serviceProvider)
    {
        _next = next;
        _serviceProvider = serviceProvider;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
          
            using (var scope = _serviceProvider.CreateScope())
            {
                var logService = scope.ServiceProvider.GetRequiredService<LogService>();
                await logService.SaveExceptionAsync(ex);
            }

            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";

            var result = JsonSerializer.Serialize(new { error = "Ocorreu um erro inesperado." });
            await context.Response.WriteAsync(result);
        }
    }
}
