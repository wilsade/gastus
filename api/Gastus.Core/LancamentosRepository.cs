using System.Data.SQLite;

using Dapper;

using Gastus.Domain;

namespace Gastus.Core
{
  /// <summary>
  /// Repositório para lançamentos
  /// </summary>
  public class LancamentosRepository(string databaseFileName) : GastusBaseRepository(databaseFileName), ILancamentosRepository
  {
    /// <summary>
    /// Recuperar o próximo Id
    /// </summary>
    /// <param name="connection">Conexão com o banco de dados</param>
    /// <returns>Próximo Id</returns>
    static int GetNextId(SQLiteConnection connection)
    {
      const string sql = "SELECT IFNULL(MAX(Id), 0) + 1 NextId FROM LANCAMENTO;";
      int nextId = connection.QuerySingle<int>(sql);
      return nextId;
    }

    /// <summary>
    /// Adicionar um lançamento
    /// </summary>
    /// <param name="insertModel">Modelo para inserção</param>
    /// <returns>Lançamento inserido</returns>
    public LancamentoModel AddLancamento(LancamentoInsertModel insertModel)
    {
      const string sql = @"
        INSERT INTO Lancamento (Id, Data, Titulo, Comentario, IdCategoria, IdSubCategoria, IdTipoTransacao, Valor)
        VALUES (@Id, @Data, @Titulo, @Comentario, @IdCategoria, @IdSubCategoria, @IdTipoTransacao, @Valor);";
      using var connection = GetConnection(false);
      var novoLancamento = new LancamentoModel(GetNextId(connection),
        DateOnly.Parse(insertModel.Data), insertModel.Titulo, insertModel.Comentario,
        insertModel.IdCategoria, insertModel.IdSubCategoria, insertModel.IdTipoTransacao,
        insertModel.Valor);
      _ = connection.Execute(sql, new
      {
        novoLancamento.Id,
        Data = novoLancamento.Data.ToString("yyyy-MM-dd"),
        novoLancamento.Titulo,
        novoLancamento.Comentario,
        novoLancamento.IdCategoria,
        novoLancamento.IdSubCategoria,
        novoLancamento.IdTipoTransacao,
        novoLancamento.Valor
      });
      return novoLancamento;
    }
  }
}
