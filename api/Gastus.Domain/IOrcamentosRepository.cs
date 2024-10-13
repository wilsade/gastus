
namespace Gastus.Domain
{
  /// <summary>
  /// Serviços do repositório de orçamento
  /// </summary>
  public interface IOrcamentosRepository
  {
    /// <summary>
    /// Adicionar um Orçamento
    /// </summary>
    /// <param name="insertModel">Modelo de inserção</param>
    /// <returns></returns>
    OrcamentoModel AddOrcamento(OrcamentoInsertModel insertModel);

    /// <summary>
    /// Excluir um Orçamento
    /// </summary>
    /// <param name="id">Identificador</param>
    /// <returns>Número de registros afetados</returns>
    int DeleteOrcamento(int id);

    /// <summary>
    /// Editar um Orçamento
    /// </summary>
    /// <param name="model">Orçamento</param>
    /// <returns>Número de registgors afetados</returns>
    int EditOrcamento(OrcamentoModel model);

    /// <summary>
    /// Recuperar todos os Orçamento
    /// </summary>
    /// <returns>Todos os Orçamento</returns>
    List<OrcamentoModel> GetAllOrcamentos();

    /// <summary>
    /// Recuperar um Orçamento
    /// </summary>
    /// <param name="id">Identificador</param>
    /// <returns>Orçamento</returns>
    OrcamentoModel GetOrcamento(int id);
  }
}
