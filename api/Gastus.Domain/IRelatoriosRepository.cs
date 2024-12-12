namespace Gastus.Domain
{
  /// <summary>
  /// Expor os relatórios disponíveis
  /// </summary>
  public interface IRelatoriosRepository
  {
    /// <summary>
    /// Recuperar o total das aplicações
    /// </summary>
    /// <returns>Total aplicações</returns>
    List<RelatTotalAplicacaoModel> GetTotalAplicacoes();

    /// <summary>
    /// Recuperar o relatório de lancamentos por categoria/mês
    /// </summary>
    /// <returns>Lançamentos por categoria/mês</returns>
    List<RelatLancamentosPorCategoriaMesModel> GetLancamentosPorCategoriaMes();

    /// <summary>
    /// Recuperar o relatório de Previsto x Realizado
    /// </summary>
    /// <returns>Relatório de Previsto x Realizado</returns>
    List<RelatPrevistoRealizadoModel> GetPrevistoRealizado();
  }
}
