using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para Lançamentos de aplicação
  /// </summary>
  [ApiController]
  [Route("api/[controller]")]
  public class LancamentosAplicacaoController(ICadastrosRepository repository) : GastusBaseController(repository)
  {
    /// <summary>
    /// Recuperar todos os Lançamentos de uma aplicação
    /// </summary>
    /// <param name="idAplicacao">Identificador da Aplicação</param>
    /// <returns>Todos os lançamentos da aplicação</returns>
    [HttpGet()]
    public IActionResult GetAll(int idAplicacao)
    {
      try
      {
        List<LancamentoAplicacaoModel> lista = _repository.GetAllLancamentosAplicacao(idAplicacao);
        return Ok(lista);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Inserir um Lançamento de Aplicação
    /// </summary>
    /// <param name="model">Dados da inserção</param>
    /// <returns>Lançamento inserido</returns>
    [HttpPost()]
    public IActionResult AddLancamento([FromBody] LancamentoAplicacaoInsertModel model)
    {
      try
      {
        LancamentoAplicacaoModel novoLancamento = _repository.AddLancamentoAplicacao(model);
        return Ok(novoLancamento);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Excluir um Lançamento de uma aplicação
    /// </summary>
    /// <param name="idAplicacao">Identificador da Lançamento</param>
    /// <param name="id">Identificador da aplicação</param>
    /// <returns>NotFound se não houve exclusão; OK em caso de sucesso</returns>
    [HttpDelete("{idAplicacao}/{id}")]
    public IActionResult DeleteLancamento(int idAplicacao, int id)
    {
      try
      {
        int rowsAffected = _repository.DeleteLancamentoAplicacao(idAplicacao, id);
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
