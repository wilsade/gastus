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
        DateTime.Parse(insertModel.Data), insertModel.Titulo, insertModel.Comentario,
        insertModel.IdCategoria, insertModel.IdSubCategoria, insertModel.IdTipoTransacao,
        insertModel.Valor);
      _ = connection.Execute(sql, new
      {
        novoLancamento.Id,
        novoLancamento.Data,
        novoLancamento.Titulo,
        novoLancamento.Comentario,
        novoLancamento.IdCategoria,
        novoLancamento.IdSubCategoria,
        novoLancamento.IdTipoTransacao,
        novoLancamento.Valor
      });
      return novoLancamento;
    }

    /// <summary>
    /// Recuperar os lançamentos
    /// </summary>
    /// <returns>Lançamentos</returns>
    public List<LancamentoViewModel> GetLancamentos()
    {
      const string sql = @"
        SELECT L.*,
          C.Nome NomeCategoria, S.Nome NomeSubCategoria, T.Nome NomeTipoTransacao
        FROM LANCAMENTO L
          JOIN CATEGORIA C ON L.IdCategoria = C.Id
          JOIN SUBCATEGORIA S ON L.IdCategoria = S.IdCategoria AND L.IdSubCategoria = S.Id
          LEFT JOIN TIPOTRANSACAO T ON L.IdTipoTransacao = T.Id";
      var connection = GetConnection(false);
      List<LancamentoViewModel> lancamentos = connection.Query<LancamentoViewModel>
        (sql).ToList();
      return lancamentos;
    }
  }
}
