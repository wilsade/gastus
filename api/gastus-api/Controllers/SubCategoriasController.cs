using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para Subcategorias
  /// </summary>
  /// <remarks>
  /// Inicialização da classe: <see cref="SubCategoriasController"/>.
  /// </remarks>
  /// <param name="repository">Repositório</param>
  [ApiController]
  [Route("api/[controller]")]
  public class SubCategoriasController(ICadastrosRepository repository) : GastusBaseCadastrosController(repository)
  {
    /// <summary>
    /// Recuperar todas as subcategorias cadastradas
    /// </summary>
    /// <returns>Subcategorias</returns>
    [HttpGet()]
    public IActionResult GetAllSubCategorias(int? idCategoria)
    {
      try
      {
        List<SubCategoriaModel> lista = _repository.GetAllSubCategorias(idCategoria);
        return Ok(lista);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Recuperar uma Subcategoria
    /// </summary>
    /// <param name="idCategoria">Identificador da categoria</param>
    /// <param name="id">Identificador da subcategoria</param>
    /// <returns>SubCategoria</returns>
    [HttpGet("{idCategoria}/{id}")]
    public IActionResult GetById(int idCategoria, int id)
    {
      try
      {
        SubCategoriaModel model = _repository.GetSubCategoria(idCategoria, id);
        if (model == null)
          return NotFound($"Subcategoria [{idCategoria},{id}] não encontrado.");
        return Ok(model);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Inserir uma subcategoria
    /// </summary>
    /// <param name="model">Dados da inserção</param>
    /// <returns>SubCategoria inserida</returns>
    [HttpPost()]
    public IActionResult AddSubCategoria([FromBody] SubCategoriaInsertModel model)
    {
      try
      {
        SubCategoriaModel novaSubCategoria = _repository.AddSubCategoria(model);
        return Ok(novaSubCategoria);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Excluir uma Subcategoria
    /// </summary>
    /// <param name="idCategoria">Identificador da subCategoria</param>
    /// <param name="id">Identificador da categoria</param>
    /// <returns>NotFound se não houve exclusão; OK em caso de sucesso</returns>
    [HttpDelete("{idCategoria}/{id}")]
    public IActionResult DeleteSubCategoria(int idCategoria, int id)
    {
      try
      {
        int rowsAffected = _repository.DeleteSubCategoria(idCategoria, id);
        if (rowsAffected > 0)
          return Ok(rowsAffected);
        return NotFound();
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Editar uma subcategoria
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>SubCategoria modificada</returns>
    [HttpPut()]
    public IActionResult EditSubCategoria([FromBody] SubCategoriaModel model)
    {
      try
      {
        int rowsAffected = _repository.EditSubCategoria(model);
        if (rowsAffected > 0)
          return Ok(rowsAffected);
        return NotFound();
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }
  }
}
