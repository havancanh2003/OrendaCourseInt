using Infrastructure.Data;
using Infrastructure.Common;
using Microsoft.EntityFrameworkCore;
using Application;

var builder = WebApplication.CreateBuilder(args);

// connect to database
var conn = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(conn,ServerVersion.AutoDetect(conn)));

// Add services to the container.
builder.Services.AddInfrastructuresServices();
builder.Services.AddApplicationServices();


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
