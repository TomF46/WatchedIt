global using WatchedIt.Api.Models;
global using Microsoft.EntityFrameworkCore;
global using Data;
global using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Services.FilmService;
using WatchedIt.Api.Middleware;
using Serilog;
using WatchedIt.Api.Services.PersonService;
using WatchedIt.Api.Services.CreditService;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<WatchedItContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IFilmService, FilmService>();
builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<ICreditService, CreditService>();
builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();
app.UseGlobalExceptionHandler();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

var log = new LoggerConfiguration()
    .WriteTo.File("log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

app.Run();
