using System.Data.SQLite;

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
    /// <returns>Connection</returns>
    protected SQLiteConnection GetConnection()
    {
      var connection = new SQLiteConnection(_databaseFileName);
      connection.Open();
      return connection;
    }

    /// <summary>
    /// Recuperar o próximo Id da entidade
    /// </summary>
    /// <returns>Próximo Id</returns>
    protected abstract int GetNextId();
  }
}
