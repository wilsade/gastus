
using System.Reflection;

using Gastus.Core;
using Gastus.Domain;

namespace Gastus.Api
{
  /// <summary>
  /// Program
  /// </summary>
  public class Program
  {
    /// <summary>
    /// Método principal da aplicação
    /// </summary>
    /// <param name="args">Argumentos do método</param>
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      // Add services to the container.

      string gastusPath = Environment.GetEnvironmentVariable("GASTUS_DB_PATH", EnvironmentVariableTarget.Machine);
      string DATABASE_FILE_NAME = $@"Data Source={gastusPath};Version=3;";
      builder.Services.AddSingleton<ICadastrosRepository>(x => new CadastrosRepository(DATABASE_FILE_NAME));
      builder.Services.AddSingleton<ILancamentosRepository>(x => new LancamentosRepository(DATABASE_FILE_NAME));
      builder.Services.AddSingleton<IOrcamentosRepository>(x => new OrcamentosRepository(DATABASE_FILE_NAME));

      builder.Services.AddControllers()
        .AddJsonOptions(options =>
        {
          options.JsonSerializerOptions.PropertyNamingPolicy = null; // Remove a conversão camelCase
        });
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen(options =>
      {
        // Obter o caminho do arquivo de documentação XML
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

        // Configura o Swagger para usar o arquivo XML
        options.IncludeXmlComments(xmlPath);
      });

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
