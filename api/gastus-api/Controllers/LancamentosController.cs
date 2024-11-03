using System.Collections.Generic;
using System.Text.RegularExpressions;

using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para lançamentos
  /// </summary>
  [ApiController]
  [Route("api/[controller]")]
  public partial class LancamentosController(ILancamentosRepository lancamentosRepository) : GastusBaseController
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

    /// <summary>
    /// Recuperar um Lançamento
    /// </summary>
    /// <param name="id">Identificador do Lançamento</param>
    /// <returns>Lançamento</returns>
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      try
      {
        LancamentoModel model = _lancamentosRepository.GetLancamento(id);
        if (model == null)
          return NotFound($"Lançamento com ID={id} não encontrado.");
        return Ok(model);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Excluir um Lançamento
    /// </summary>
    /// <param name="id">Identificador do Lançamento</param>
    /// <returns>NotFound se não houve exclusão; OK em caso de sucesso</returns>
    [HttpDelete("{id}")]
    public IActionResult DeleteLancamento(int id)
    {
      try
      {
        int rowsAffected = _lancamentosRepository.DeleteLancamento(id);
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
    /// Editar um Lançamento
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>NoContent se não houve alteração; OK em caso de sucesso</returns>
    [HttpPut()]
    public IActionResult EditLancamento([FromBody] LancamentoModel model)
    {
      try
      {
        int rowsAffected = _lancamentosRepository.EditLancamento(model);
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
    /// Agrupar lançamentos por título
    /// </summary>
    /// <returns>Lançamentos agrupados</returns>
    [HttpGet("bytitulo")]
    public IActionResult LookupByTitulo()
    {
      try
      {
        List<LancamentoViewModel> lancamentos = _lancamentosRepository.GetLancamentos();
        Regex regexRetiraData = RetiraData();
        Regex regexRetiraEspacos = RetiraEspacos();
        lancamentos.ForEach(lancamento =>
        {
          string semData = regexRetiraData.Replace(lancamento.Titulo, "");
          semData = regexRetiraEspacos.Replace(semData, " ");
          lancamento.Titulo = semData.Trim();
        });

        var agrupado = lancamentos.GroupBy(x => x.Titulo);
        var retorno = (from item in agrupado
                       let ultimo = item.OrderByDescending(x => x.Data).First()
                       select new
                       {
                         Titulo = item.Key,
                         ultimo.IdCategoria,
                         ultimo.NomeCategoria,
                         ultimo.IdSubCategoria,
                         ultimo.NomeSubCategoria,
                         ultimo.Comentario,
                         ultimo.IdTipoTransacao,
                         ultimo.NomeTipoTransacao
                       }).OrderBy(x => x.Titulo);
        return Ok(retorno);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    [GeneratedRegex("[0-9]*\\/[0-9]+", RegexOptions.IgnoreCase | RegexOptions.Compiled, "pt-BR")]
    private static partial Regex RetiraData();

    [GeneratedRegex("\\s+", RegexOptions.IgnoreCase | RegexOptions.Compiled, "pt-BR")]
    private static partial Regex RetiraEspacos();
  }
}
