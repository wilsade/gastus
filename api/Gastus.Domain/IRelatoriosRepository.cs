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
    List<TotalAplicacaoModel> GetTotalAplicacoes();
  }
}
