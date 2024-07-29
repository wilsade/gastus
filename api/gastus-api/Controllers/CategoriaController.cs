using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para Categorias
  /// </summary>
  [ApiController]
  [Route("[controller]")]
  public class CategoriaController : GastusBaseController
  {
    /// <summary>
    /// Recuperar todas as categorias cadastradas
    /// </summary>
    /// <returns>All categorias</returns>
    [HttpGet]
    public IActionResult GetAllCategorias()
    {
      try
      {
        var obj = new
        {
          codigo = 1,
          nome = "Lazer"
        };
        return Ok(obj);
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }
  }
}
