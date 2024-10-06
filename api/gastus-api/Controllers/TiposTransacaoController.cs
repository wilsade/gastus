using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para Tipos de transação
  /// </summary>
  [ApiController]
  [Route("api/[controller]")]
  public class TiposTransacaoController(ICadastrosRepository repository) : GastusBaseController(repository)
  {
    /// <summary>
    /// Recuperar todas os Tipos de transações
    /// </summary>
    /// <returns>Todos os tipos de transações</returns>
    [HttpGet()]
    public IActionResult GetAll()
    {
      try
      {
        List<TipoTransacaoModel> lista = _repository.GetAllTiposTransacao();
        return Ok(lista);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Recuperar um Tipo de transação
    /// </summary>
    /// <param name="id">Identificador do Tipo de transação</param>
    /// <returns>Tipo de transação</returns>
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      try
      {
        TipoTransacaoModel model = _repository.GetTipoTransacao(id);
        if (model == null)
          return NotFound($"Tipo de transação com ID={id} não encontrado.");
        return Ok(model);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Inserir um Tipo de transação
    /// </summary>
    /// <param name="insertModel">Tipo de transação</param>
    /// <returns>Tipo de transação inserido</returns>
    [HttpPost()]
    public IActionResult AddTipoTransacao([FromBody] TipoTransacaoInsertModel insertModel)
    {
      try
      {
        TipoTransacaoModel model = _repository.AddTipoTransacao(insertModel);
        return Ok(model);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Excluir um Tipo de transação
    /// </summary>
    /// <param name="id">Identificador do Tipo de transação</param>
    /// <returns>NoContent se não houve exclusão; OK em caso de sucesso</returns>
    [HttpDelete("{id}")]
    public IActionResult DeleteTipoTransacao(int id)
    {
      try
      {
        int rowsAffected = _repository.DeleteTipoTransacao(id);
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
    /// Editar um Tipo de transação
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>NoContent se não houve alteração; OK em caso de sucesso</returns>
    [HttpPut()]
    public IActionResult EditTipoTransacao([FromBody] TipoTransacaoModel model)
    {
      try
      {
        int rowsAffected = _repository.EditTipoTransacao(model);
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
