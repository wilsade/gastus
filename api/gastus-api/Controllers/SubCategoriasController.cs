using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para SubCategorias
  /// </summary>
  [ApiController]
  [Route("[controller]")]
  public class SubCategoriasController(ICategoriasRepository repository) :
    GastusBaseController(repository)
  {
  }
}
