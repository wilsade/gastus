using System.Data.SQLite;

using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Inicialização da classe: <see cref="GastusBaseController"/>.
  /// </summary>
  /// <param name="repository">Repositório</param>
  public abstract class GastusBaseController(ICadastrosRepository repository) : ControllerBase
  {
    /// <summary>
    /// Repository
    /// </summary>
    protected readonly ICadastrosRepository _repository = repository;

    /// <summary>
    /// Return Bad Request Exception
    /// </summary>
    /// <param name="ex">Ex</param>
    /// <returns></returns>
    protected IActionResult ReturnBadRequestException(Exception ex)
    {
      if (ex is SQLiteException sqlEx)
        return BadRequest(new { message = sqlEx.Message });
      else
        return StatusCode(500, new
        {
          message = ex.InnerException?.Message ?? ex.Message
        });
    }
  }
}
