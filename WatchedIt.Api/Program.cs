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
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WatchedIt.Api.Services.AuthenticationService;
using Microsoft.OpenApi.Models;
using WatchedIt.Api.Services.UserService;
using WatchedIt.Api.Services.ReviewService;
using WatchedIt.Api.Services.WatchedFilmsService;
using WatchedIt.Api.Services.FilmListService;
using Amazon.S3;
using WatchedIt.Api.Services.File;
using WatchedIt.Api.Services.CategoryService;
using Microsoft.Extensions.FileProviders;
using WatchedIt.Api.Models.Configuration;
using WatchedIt.Api.Services.Likes;
using WatchedIt.Api.Services.ReviewCommentsService;
using WatchedIt.Api.Services.NotificationService;
using WatchedIt.Api.Data;
using WatchedIt.Api.Services.FilmTriviaService;
using WatchedIt.Api.Services.Games.GuessFilmFromCast;
using WatchedIt.Api.Services.Games.GuessFilmFromDescription;
using WatchedIt.Api.Services.Games.Connections;
using WatchedIt.Api.Services.NewsArticleService;
using WatchedIt.Api.Services.FilmImageService;
using WatchedIt.Api.Services.PersonImageService;
using WatchedIt.Api.Services.TagService;

var builder = WebApplication.CreateBuilder(args);

var corsPolicyName = "_corsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicyName,
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});

// Add services to the container.
builder.Services.AddDbContext<WatchedItContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IAuthenticationService>();
                        var userId = int.Parse(context.Principal.Identity.Name);
                        var user = userService.GetById(userId);
                        if (user == null)
                        {
                            // return unauthorized if user no longer exists
                            context.Fail("Unauthorized");
                        }
                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["AppSettings:AuthSecret"])),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

builder.Services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description =
        "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,

                        },
                        new List<string>()
                    }
                });
            });

builder.Services.Configure<AWSConfiguration>(builder.Configuration.GetSection("AWS"));
builder.Services.Configure<ImagesConfiguration>(builder.Configuration.GetSection("Images"));

var imagesSettings = builder.Configuration.GetSection("Images").Get<ImagesConfiguration>();

if (imagesSettings.UseS3)
{
    builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
    builder.Services.AddAWSService<IAmazonS3>();
    builder.Services.AddScoped<IFileService, S3FileService>();
}
else
{
    builder.Services.AddScoped<IFileService, DiskFileService>();
}

builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddTransient<DataSeeder>();
builder.Services.AddScoped<IFilmService, FilmService>();
builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<ICreditService, CreditService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<IWatchedFilmsService, WatchedFilmsService>();
builder.Services.AddScoped<IFilmListService, FilmListService>();
builder.Services.AddScoped<IFileService, DiskFileService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ILikesService, LikesService>();
builder.Services.AddScoped<IReviewCommentsService, ReviewCommentsService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IFilmTriviaService, FilmTriviaService>();
builder.Services.AddScoped<IGuessFilmFromCastGameService, GuessFilmFromCastGameService>();
builder.Services.AddScoped<IGuessFilmFromDescriptionGameService, GuessFilmFromDescriptionGameService>();
builder.Services.AddScoped<IConnectionsGameService, ConnectionsGameService>();
builder.Services.AddScoped<INewsArticleService, NewsArticleService>();
builder.Services.AddScoped<IFilmImageService, FilmImageService>();
builder.Services.AddScoped<IPersonImageService, PersonImageService>();
builder.Services.AddScoped<ITagService, TagService>();


var app = builder.Build();
app.UseGlobalExceptionHandler();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
    RequestPath = new PathString("/Resources")
});

app.UseCors(corsPolicyName);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

var log = new LoggerConfiguration()
    .WriteTo.File("log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

if (args.Length == 1 && args[0].ToLower() == "seeddata")
    SeedData(app);

//Seed Data
void SeedData(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

    using (var scope = scopedFactory.CreateScope())
    {
        var service = scope.ServiceProvider.GetService<DataSeeder>();
        service.Seed();
    }
}

app.Run();
