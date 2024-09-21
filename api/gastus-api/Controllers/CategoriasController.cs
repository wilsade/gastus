using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;


using System.Data.SQLite;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para Categorias
  /// </summary>
  /// <remarks>
  /// Inicialização da classe: <see cref="CategoriasController"/>.
  /// </remarks>
  /// <param name="repository">Repositório</param>
  [ApiController]
  [Route("[controller]")]
  public class CategoriasController(ICategoriasRepository repository) : GastusBaseController(repository)
  {
    /// <summary>
    /// Recuperar todas as categorias cadastradas
    /// </summary>
    /// <returns>All categorias</returns>
    [HttpGet()]
    public IActionResult GetAllCategorias()
    {
      try
      {
        List<CategoriaModel> lista = _repository.GetAllCategorias();
        return Ok(lista);

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
        return ReturnBadRequestException(ex);
      }
    }

    [HttpPost()]
    public IActionResult AddCategoria([FromBody] CategoriaInsertModel categoria)
    {
      try
      {
        CategoriaModel model = _repository.AddCategoria(categoria);
        return Ok(model);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    [HttpDelete("id")]
    public async Task<IActionResult> DeleteCategoria(int id)
    {
      try
      {
        int rowsAffected = _repository.DeleteCategoria(id);
        return Ok(rowsAffected);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }

      // Retorna 204 No Content em caso de sucesso
      return NoContent();
    }
  }
}
