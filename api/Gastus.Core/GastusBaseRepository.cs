using System.Data.SQLite;

using Dapper;

namespace Gastus.Core
{
  /// <summary>
  /// Repositório da aplicação
  /// </summary>
  /// <remarks>
  /// Inicialização da classe: <see cref="GastusBaseRepository"/>.
  /// </remarks>
  /// <param name="databaseFileName">Database file name</param>
  public abstract class GastusBaseRepository(string databaseFileName)
  {
    private readonly string _databaseFileName = databaseFileName;

    /// <summary>
    /// Recuperar o indicador de receita de uma categoria
    /// </summary>
    /// <param name="conn">Conexão com o banco de dados</param>
    /// <param name="dicCategorias">Dicionário de categorias</param>
    /// <param name="idCategoria">Identificador da categoria</param>
    /// <returns>indicador de receita de uma categoria</returns>
    static protected bool GetIndicaReceitaFromDic(SQLiteConnection conn, Dictionary<int, bool> dicCategorias, int idCategoria)
    {
      if (!dicCategorias.TryGetValue(idCategoria, out bool value))
      {
        bool tipo = conn.QuerySingle<bool>("SELECT IndicaReceita FROM Categoria WHERE Id = @id", new { id = idCategoria });
        value = tipo;
        dicCategorias.Add(idCategoria, value);
        return tipo;
      }
      return value;
    }

    /// <summary>
    /// Recuperar a conexão com o banco de dados
    /// </summary>
    /// <param name="activateForeignKeyPragma">true para ativar a constraint de FK</param>
    /// <returns>Connection</returns>
    protected SQLiteConnection GetConnection(bool activateForeignKeyPragma)
    {
      var connection = new SQLiteConnection(_databaseFileName);
      connection.Open();
      if (activateForeignKeyPragma)
      {
        int rows = connection.Execute("PRAGMA foreign_keys = ON;");
        System.Diagnostics.Trace.WriteLine(rows);
      }
      return connection;
    }

    /// <summary>
    /// Recuperar o próximo Id de uma tabela
    /// </summary>
    /// <param name="connection">Conexão com o banco de dados</param>
    /// <param name="tableName">Nome da tabela</param>
    /// <returns>Próximo Id</returns>
    protected static int GetNextIdFromTabela(SQLiteConnection connection, string tableName)
    {
      string sql = $"SELECT IFNULL(MAX(Id), 0) + 1 NextId FROM {tableName};";
      int nextId = connection.QuerySingle<int>(sql);
      return nextId;
    }

    /// <summary>
    /// Excluir uma categoria
    /// </summary>
    /// <param name="tableName">Nome da tabela</param>
    /// <param name="id">Identificador da registro a ser excluído</param>
    /// <returns>Número de linhas afetadas na exclusão</returns>
    protected int DeleteById(string tableName, int id)
    {
      using SQLiteConnection connection = GetConnection(true);
      var commandText = $"DELETE FROM {tableName} WHERE Id = @id";
      int rows = connection.Execute(commandText, new { id });
      return rows;
    }
  }
}