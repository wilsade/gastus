using System.Collections.Generic;
using System.Data.SQLite;
using System.Net.Http.Headers;

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
      var lst = ImportarLancamentos([insertModel]);
      return lst.FirstOrDefault();
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
          LEFT JOIN TIPOTRANSACAO T ON L.IdTipoTransacao = T.Id
        ORDER BY L.DATA";
      var connection = GetConnection(false);
      List<LancamentoViewModel> lancamentos = connection.Query<LancamentoViewModel>
        (sql).ToList();
      return lancamentos;
    }

    /// <summary>
    /// Excluir um Lançamento
    /// </summary>
    /// <param name="id">Identificador do lançamento ser excluído</param>
    /// <returns>Número de linhas afetadas na exclusão</returns>
    public int DeleteLancamento(int id)
    {
      using SQLiteConnection connection = GetConnection(true);
      var commandText = "DELETE FROM Lancamento WHERE Id = @id";
      int rows = connection.Execute(commandText, new { id });
      return rows;
    }

    /// <summary>
    /// Recuperar um Lançamento
    /// </summary>
    /// <param name="id">Identificador do Lançamento</param>
    /// <returns>Lançamento</returns>
    public LancamentoModel GetLancamento(int id)
    {
      const string sql = "SELECT * FROM Lancamento WHERE Id = @id";
      using var connection = GetConnection(false);
      LancamentoModel lancamento = connection.QueryFirstOrDefault<LancamentoModel>(sql, new { id });
      return lancamento;
    }

    /// <summary>
    /// Editar um Lançamento
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>Número de registros afetados</returns>
    public int EditLancamento(LancamentoModel model)
    {
      Dictionary<int, bool> dicCategorias = [];

      const string sql = @"
        UPDATE Lancamento
        SET 
            Data = @Data,
            Titulo = @Titulo,
            Comentario = @Comentario,
            IdCategoria = @IdCategoria,
            IdSubCategoria = @IdSubCategoria,
            IdTipoTransacao = @IdTipoTransacao,
            Valor = @Valor
        WHERE Id = @Id";

      using var connection = GetConnection(true);

      bool indicaReceita = GetIndicaReceitaFromDic(connection, dicCategorias, model.IdCategoria);
      if (model.Valor > 0 && !indicaReceita)
        model.Valor *= -1;
      else if (model.Valor < 0 && indicaReceita)
        model.Valor *= -1;

      return connection.Execute(sql, model);
    }

    /// <summary>
    /// Importar lançamentos
    /// </summary>
    /// <param name="lancamentos">Lançamentos a serem importados</param>
    /// <returns>Lançamentos importados</returns>
    public List<LancamentoModel> ImportarLancamentos(List<LancamentoInsertModel> lancamentos)
    {
      Dictionary<int, bool> dicCategorias = [];

      const string sql = @"
        INSERT INTO Lancamento (Id, Data, Titulo, Comentario, IdCategoria, IdSubCategoria, IdTipoTransacao, Valor)
        VALUES (@Id, @Data, @Titulo, @Comentario, @IdCategoria, @IdSubCategoria, @IdTipoTransacao, @Valor);";
      var lst = new List<LancamentoModel>();
      using var connection = GetConnection(false);
      foreach (var insertModel in lancamentos)
      {
        bool indicaReceita = GetIndicaReceitaFromDic(connection, dicCategorias, insertModel.IdCategoria);
        if (insertModel.Valor > 0 && !indicaReceita)
          insertModel.Valor *= -1;
        else if (insertModel.Valor < 0 && indicaReceita)
          insertModel.Valor *= -1;

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
        lst.Add(novoLancamento);
      }
      return lst;
    }
  }
}
