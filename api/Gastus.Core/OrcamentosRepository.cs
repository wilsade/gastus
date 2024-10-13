
using System.Data;
using System.Drawing;

using Dapper;

using Gastus.Domain;

using static System.Runtime.InteropServices.JavaScript.JSType;

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
      var connection = GetConnection(false);
      const string sql = @"
        INSERT INTO ORCAMENTO (Id, IdCategoria, IdSubCategoria, NumMes, NomeMes, Valor, Descricao)
        VALUES (@Id, @IdCategoria, @IdSubCategoria, @NumMes, @NomeMes, @Valor, @Descricao)";
      var novoOrcamento = new OrcamentoModel(GetNextIdFromTabela(connection, "Orcamento"),
        insertModel.IdCategoria,
        insertModel.IdSubCategoria,
        insertModel.NumMes,
        insertModel.NomeMes,
        insertModel.Valor,
        insertModel.Descricao);
      _ = connection.Execute(sql, novoOrcamento);
      return novoOrcamento;
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
      var connection = GetConnection(false);
      const string sql = "SELECT * FROM ORCAMENTO ORDER BY NumMes, IdCategoria, IdSubCategoria";
      var lista = connection.Query<OrcamentoModel>(sql).ToList();
      return lista;
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
