using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para lançamentos
  /// </summary>
  [ApiController]
  [Route("api/[controller]")]
  public class LancamentosController(ICadastrosRepository cadastrosRepository,
    ILancamentosRepository lancamentosRepository) : GastusBaseController(cadastrosRepository)
  {
    private readonly ILancamentosRepository _lancamentosRepository = lancamentosRepository;

    /// <summary>
    /// Adicionar um lançamento
    /// </summary>
    /// <param name="insertModel">Modelo de inserção</param>
    /// <returns>Lançamento inserido</returns>
    [HttpPost]
    public IActionResult AddLancamento([FromBody] LancamentoInsertModel insertModel)
    {
      try
      {
        LancamentoModel model = _lancamentosRepository.AddLancamento(insertModel);
        return Ok(model);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Recuperar os lancamentos
    /// </summary>
    /// <returns>Lancamentos</returns>
    [HttpGet]
    public IActionResult GetLancamentos()
    {
      try
      {
        var lancamentos = _lancamentosRepository.GetLancamentos();
        return Ok(lancamentos);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }
  }
}
