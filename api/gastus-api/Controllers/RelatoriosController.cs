using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para Relatórios
  /// </summary>
  [ApiController]
  [Route("api/[controller]")]
  public class RelatoriosController(IRelatoriosRepository relatoriosRepository) : GastusBaseController
  {
    private readonly IRelatoriosRepository _repository = relatoriosRepository;

    /// <summary>
    /// Recuperar o total das aplicações
    /// </summary>
    /// <returns>Total das aplicações</returns>
    [HttpGet("totalaplicacoes")]
    public IActionResult GetTotalAplicacoes()
    {
      try
      {
        var result = _repository.GetTotalAplicacoes();
        return Ok(result);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Recuperar os lançamentos por categoria/mês
    /// </summary>
    /// <returns>lançamentos por categoria/mês</returns>
    [HttpGet("lancamentosPorCategoriaMes")]
    public IActionResult GetLancamentosPorCategoriaMes()
    {
      try
      {
        var result = _repository.GetLancamentosPorCategoriaMes();
        return Ok(result);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Recuperar o relatório de Previsto x Realizado
    /// </summary>
    /// <returns>Relatório de Previsto x Realizado</returns>
    [HttpGet("previstorealizado")]
    public IActionResult GetPrevistoRealizado()
    {
      try
      {
        var result = _repository.GetPrevistoRealizado();
        return Ok(result);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }
  }
}
