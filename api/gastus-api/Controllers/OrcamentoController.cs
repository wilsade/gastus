using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para Orçamento
  /// </summary>
  [ApiController]
  [Route("api/[controller]")]
  public class OrcamentoController(IOrcamentosRepository repository) : GastusBaseController
  {
    readonly IOrcamentosRepository _repository = repository;

    /// <summary>
    /// Recuperar todos os Orçamentos
    /// </summary>
    /// <returns>Todos os Orçamento</returns>
    [HttpGet()]
    public IActionResult GetAll()
    {
      try
      {
        List<OrcamentoViewModel> lista = _repository.GetAllOrcamentos();
        return Ok(lista);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Recuperar um Orçamento
    /// </summary>
    /// <param name="id">Identificador do Orçamento</param>
    /// <returns>Orçamento</returns>
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      try
      {
        OrcamentoModel model = _repository.GetOrcamento(id);
        if (model == null)
          return NotFound($"Orçamento com ID={id} não encontrado.");
        return Ok(model);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Inserir Orçamentos
    /// </summary>
    /// <param name="insertModel">Modelo de inserção</param>
    /// <returns>Orçamentos inseridos</returns>
    [HttpPost()]
    public IActionResult AddOrcamento([FromBody] OrcamentoInsertModel insertModel)
    {
      try
      {
        if (insertModel.NumMeses.Length == 0)
          throw new ArgumentException($"Parâmetro não informado: {nameof(insertModel.NumMeses)}");

        if (insertModel.NumMeses.Any(x => (x <= 0) || (x > 12)))
          throw new ArgumentException($"{nameof(insertModel.NumMeses)} deve conter números entre 1 e 12");

        List<OrcamentoModel> inseridos = _repository.AddOrcamentos(insertModel);
        return Ok(inseridos);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Excluir um Orçamento
    /// </summary>
    /// <param name="id">Identificador do Orçamento</param>
    /// <returns>NotFound se não houve exclusão; OK em caso de sucesso</returns>
    [HttpDelete("{id}")]
    public IActionResult DeleteOrcamento(int id)
    {
      try
      {
        int rowsAffected = _repository.DeleteOrcamento(id);
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
    /// Editar um Orçamento
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>NoContent se não houve alteração; OK em caso de sucesso</returns>
    [HttpPut()]
    public IActionResult EditOrcamento([FromBody] OrcamentoModel model)
    {
      try
      {
        int rowsAffected = _repository.EditOrcamento(model);
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
