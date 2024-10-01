using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

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
  [Route("api/[controller]")]
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
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Recuperar uma categoria
    /// </summary>
    /// <param name="id">Identificador da categoria</param>
    /// <returns>Categoria</returns>
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      try
      {
        CategoriaModel model = _repository.GetCategoria(id);
        return Ok(model);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Inserir uma categoria
    /// </summary>
    /// <param name="categoria">Categoria</param>
    /// <returns>Categoria inserida</returns>
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

    /// <summary>
    /// Excluir uma categoria
    /// </summary>
    /// <param name="id">Identificador da categoria</param>
    /// <returns>NoContent se não houve exclusão; OK em caso de sucesso</returns>
    [HttpDelete("{id}")]
    public IActionResult DeleteCategoria(int id)
    {
      try
      {
        int rowsAffected = _repository.DeleteCategoria(id);
        if (rowsAffected > 0)
          return Ok(rowsAffected);
        return NoContent();
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Editar uma categoria
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>Categoria alterada</returns>
    [HttpPut()]
    public IActionResult EditCategoria([FromBody] CategoriaEditModel model)
    {
      try
      {
        int rowsAffected = _repository.EditCategoria(model);
        if (rowsAffected > 0)
          return Ok(rowsAffected);
        return NoContent();
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }
  }
}
