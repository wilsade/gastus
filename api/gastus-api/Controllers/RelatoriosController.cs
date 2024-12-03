using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para Relatórios
  /// </summary>
  [ApiController]
  [Route("api/[controller]")]
  public class RelatoriosController(IRelatoriosRepository relatoriosRepository) : GastusBaseController
  {
    private readonly IRelatoriosRepository _repository = relatoriosRepository;

    /// <summary>
    /// Recuperar os relatorios
    /// </summary>
    /// <returns>Relatorios</returns>
    [HttpGet()]
    public IActionResult GetRelatorios() => Ok();
  }
}
