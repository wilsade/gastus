using System.Data.SQLite;

using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Inicialização da classe: <see cref="GastusBaseController"/>.
  /// </summary>
  /// <param name="repository">Repositório</param>
  public abstract class GastusBaseController(ICategoriasRepository repository) : ControllerBase
  {
    /// <summary>
    /// Repository
    /// </summary>
    protected readonly ICategoriasRepository _repository = repository;

    /// <summary>
    /// Return Bad Request Exception
    /// </summary>
    /// <param name="ex">Ex</param>
    /// <returns></returns>
    protected IActionResult ReturnBadRequestException(Exception ex)
    {
      if (ex is SQLiteException sqlEx)
        return BadRequest(new { error = sqlEx.Message });
      else
        return StatusCode(500, new
        {
          error = "An error occurred while processing your request.",
          message = ex.InnerException?.Message ?? ex.Message
        });

    }
  }
}
