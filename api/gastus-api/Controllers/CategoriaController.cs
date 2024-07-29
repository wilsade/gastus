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
        var obj = new[]
        {
          new
          {
            id = 1,
            nome = "Alimentação",
            filhas = new[]
            {
              new { idCategoria = 1, id = 1, nome = "Doces" },
              new { idCategoria = 1, id = 2, nome = "Lanchonete" },
              new { idCategoria = 1, id = 3, nome = "Padaria" },
              new { idCategoria = 1, id = 4, nome = "Restaurante" },
              new { idCategoria = 1, id = 5, nome = "Supermercado" },
              new { idCategoria = 1, id = 6, nome = "App celular" },
              new { idCategoria = 1, id = 7, nome = "Outros" },
            }
          },
          new
          {
            id = 2,
            nome = "Lazer",
            filhas = new[]
            {
              new { idCategoria = 2, id = 1, nome = "Cinema" },
              new { idCategoria = 2, id = 2, nome = "Dança" },
              new { idCategoria = 2, id = 3, nome = "Jogos" },
              new { idCategoria = 2, id = 4, nome = "Festas" },
              new { idCategoria = 2, id = 5, nome = "Bar" },
              new { idCategoria = 2, id = 6, nome = "Viagem" },
              new { idCategoria = 2, id = 7, nome = "Outros" },
            }
          }
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
