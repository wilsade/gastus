using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para Aplicações
  /// </summary>
  [ApiController]
  [Route("api/[controller]")]
  public class AplicacoesController(ICadastrosRepository repository) : GastusBaseController(repository)
  {
    /// <summary>
    /// Recuperar todas as aplicações
    /// </summary>
    /// <returns>Todos as aplicações</returns>
    [HttpGet()]
    public IActionResult GetAll()
    {
      try
      {
        List<AplicacaoModel> lista = _repository.GetAllAplicacoes();
        return Ok(lista);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Recuperar uma Aplicação
    /// </summary>
    /// <param name="id">Identificador da aplicação</param>
    /// <returns>aplicação</returns>
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      try
      {
        AplicacaoModel model = _repository.GetAplicacao(id);
        if (model == null)
          return NotFound($"aplicação com ID={id} não encontrado.");
        return Ok(model);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Inserir uma aplicação
    /// </summary>
    /// <param name="insertModel">Aplicação</param>
    /// <returns>Aplicação inserida</returns>
    [HttpPost()]
    public IActionResult AddAplicacao([FromBody] BaseInsertModel insertModel)
    {
      try
      {
        AplicacaoModel model = _repository.AddAplicacao(insertModel);
        return Ok(model);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Excluir uma aplicação
    /// </summary>
    /// <param name="id">Identificador da aplicação</param>
    /// <returns>NotFound se não houve exclusão; OK em caso de sucesso</returns>
    [HttpDelete("{id}")]
    public IActionResult DeleteAplicacao(int id)
    {
      try
      {
        int rowsAffected = _repository.DeleteAplicacao(id);
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
    /// Editar uma aplicação
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>NoContent se não houve alteração; OK em caso de sucesso</returns>
    [HttpPut()]
    public IActionResult EditAplicacao([FromBody] BaseEditModel model)
    {
      try
      {
        int rowsAffected = _repository.EditAplicacao(model);
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
