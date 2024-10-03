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
  }
}