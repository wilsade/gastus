
using Gastus.Domain;

namespace Gastus.Core
{
  /// <summary>
  /// Repositório para orçamento
  /// </summary>
  public class OrcamentosRepository(string databaseFileName) : GastusBaseRepository(databaseFileName),
    IOrcamentosRepository
  {
    /// <summary>
    /// Adicionar um Orçamento
    /// </summary>
    /// <param name="insertModel">Modelo de inserção</param>
    /// <returns></returns>
    public OrcamentoModel AddOrcamento(OrcamentoInsertModel insertModel)
    {
      throw new NotImplementedException();
    }

    /// <summary>
    /// Excluir um Orçamento
    /// </summary>
    /// <param name="id">Identificador</param>
    /// <returns>Número de registros afetados</returns>
    public int DeleteOrcamento(int id)
    {
      throw new NotImplementedException();
    }

    /// <summary>
    /// Editar um Orçamento
    /// </summary>
    /// <param name="model">Orçamento</param>
    /// <returns>Número de registgors afetados</returns>
    public int EditOrcamento(OrcamentoModel model)
    {
      throw new NotImplementedException();
    }

    /// <summary>
    /// Recuperar todos os Orçamento
    /// </summary>
    /// <returns>Todos os Orçamento</returns>
    public List<OrcamentoModel> GetAllOrcamentos()
    {
      throw new NotImplementedException();
    }

    /// <summary>
    /// Recuperar um Orçamento
    /// </summary>
    /// <param name="id">Identificador</param>
    /// <returns>Orçamento</returns>
    public OrcamentoModel GetOrcamento(int id)
    {
      throw new NotImplementedException();
    }
  }
}
