namespace Gastus.Domain
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

    /// <summary>
    /// Excluir um Lançamento
    /// </summary>
    /// <param name="id">Identificador do lançamento ser excluído</param>
    /// <returns>Número de linhas afetadas na exclusão</returns>
    int DeleteLancamento(int id);

    /// <summary>
    /// Recuperar um Lançamento
    /// </summary>
    /// <param name="id">Identificador do Lançamento</param>
    /// <returns>Lançamento</returns>
    LancamentoModel GetLancamento(int id);
  }
}
