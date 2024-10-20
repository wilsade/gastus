using System.Data.SQLite;

using Dapper;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para administração
  /// </summary>
  [ApiController]
  [Route("api/[controller]")]
  public class AdminController(string databaseFileName) : GastusBaseController
  {
    private readonly string _databaseFileName = databaseFileName;

    /// <summary>
    /// Executar um comando de SELECT
    /// </summary>
    /// <param name="sql">Comando SQL a ser executado</param>
    /// <returns>Tabela com o resultado</returns>
    [HttpPost("sql/select")]
    public IActionResult Select([FromBody] string sql)
    {
      try
      {
        using var connection = new SQLiteConnection(_databaseFileName);
        connection.Open();
        var query = connection.Query<dynamic>(sql);
        return Ok(query);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Executar um comando de INSERT/UPDATE/DELETE
    /// </summary>
    /// <param name="sql">Comando SQL a ser executado</param>
    /// <returns>Número de linhas afetadas</returns>
    [HttpPost("sql/execute")]
    public IActionResult Execute([FromBody] string sql)
    {
      try
      {
        using var connection = new SQLiteConnection(_databaseFileName);
        connection.Open();
        var rows = connection.Execute(sql);
        return Ok(rows);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

  }
}
