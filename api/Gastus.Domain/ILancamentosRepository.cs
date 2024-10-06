﻿namespace Gastus.Domain
{
  /// <summary>
  /// Serviços do repositório de lançamentos
  /// </summary>
  public interface ILancamentosRepository
  {
    /// <summary>
    /// Adicionar um lançamento
    /// </summary>
    /// <param name="model">Modelo para inserção</param>
    /// <returns>Lançamento inserido</returns>
    LancamentoModel AddLancamento(LancamentoInsertModel model);

    /// <summary>
    /// Recuperar os lançamentos
    /// </summary>
    /// <returns>Lançamentos</returns>
    List<LancamentoViewModel> GetLancamentos();
  }
}
