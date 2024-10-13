using System.Data.SQLite;

using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Inicialização da classe: <see cref="GastusBaseController"/>.
  /// </summary>
  public abstract class GastusBaseController : ControllerBase
  {
    /// <summary>
    /// Retornar uma exceção formatada
    /// </summary>
    /// <param name="ex">Exceção</param>
    /// <returns>Mensagem com status</returns>
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

  /// <summary>
  /// Inicialização da classe: <see cref="GastusBaseCadastrosController"/>.
  /// </summary>
  /// <param name="repository">Repositório</param>
  public abstract class GastusBaseCadastrosController(ICadastrosRepository repository) : GastusBaseController
  {
    /// <summary>
    /// Repository
    /// </summary>
    protected readonly ICadastrosRepository _repository = repository;
  }
}
