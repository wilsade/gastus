
using Gastus.Core;
using Gastus.Domain;

namespace Gastus.Api
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      // Add services to the container.

      const string DATABASE_FILE_NAME = @"Data Source=C:\_Wilsade\Projetos\git\gastus\gastus.db;Version=3;";
      builder.Services.AddSingleton<ICategoriasRepository>(x => new CategoriasRepository(DATABASE_FILE_NAME));

      builder.Services.AddControllers();
      // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();

      const string ALLOW_ALL = "AllowAll";
      builder.Services.AddCors(options =>
      {
        options.AddPolicy(ALLOW_ALL, builder => builder
          .AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader());
      });
      var app = builder.Build();

      // Configure the HTTP request pipeline.
      if (app.Environment.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }

      app.UseAuthorization();

      app.UseCors(ALLOW_ALL);
      app.MapControllers();

      app.Run();
    }
  }
}
