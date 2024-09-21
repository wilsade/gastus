using System.Data.SQLite;

using Dapper;

using Gastus.Domain;

namespace Gastus.Core
{
  /// <summary>
  /// Inicialização da classe: <see cref="CategoriasRepository"/>.
  /// </summary>
  /// <param name="databaseFileName">Database file name</param>
  public class CategoriasRepository(string databaseFileName) :
    GastusBaseRepository(databaseFileName), ICategoriasRepository
  {
    /// <summary>
    /// Recuperar o próximo Id da entidade
    /// </summary>
    /// <returns>Próximo Id</returns>
    static int GetNextId(SQLiteConnection connection)
    {
      const string sql = "SELECT IFNULL(MAX(id), 0) + 1 NextId FROM CATEGORIA;";
      int nextId = connection.QuerySingle<int>(sql);
      return nextId;
    }

    /// <summary>
    /// Recuperar todas as categorias
    /// </summary>
    /// <returns>Todas as categorias</returns>
    public List<CategoriaModel> GetAllCategorias()
    {
      using SQLiteConnection connection = GetConnection();
      var query = "SELECT id, nome FROM Categoria";

      var categorias = connection.Query<CategoriaModel>(query).ToList();
      return categorias;
    }

    /// <summary>
    /// Adicionar uma categoria
    /// </summary>
    /// <param name="categoria">Categoria a ser adicionada</param>
    /// <returns>Nova categoria</returns>
    public CategoriaModel AddCategoria(CategoriaInsertModel categoria)
    {
      using var connection = GetConnection();

      var query = "INSERT INTO Categoria (id, nome) VALUES (@Id, @Nome)";
      var novaCategoria = new CategoriaModel(GetNextId(connection), categoria.Nome);
      int rows = connection.Execute(query, novaCategoria);
      return novaCategoria;
    }

    /// <summary>
    /// Excluir uma categoria
    /// </summary>
    /// <param name="id">Identificador da categoria a ser excluída</param>
    /// <returns>Número de linhas afetadas na exclusão</returns>
    public int DeleteCategoria(int id)
    {
      using SQLiteConnection connection = GetConnection();
      var commandText = "DELETE FROM Categoria WHERE Id = @id";
      int rows = connection.Execute(commandText, new { id });
      return rows;
    }

    /// <summary>
    /// Recuperar uma categoria
    /// </summary>
    /// <param name="id">Identificador da categoria a ser excluída</param>
    /// <returns>Categoria</returns>
    public CategoriaModel GetCategoria(int id)
    {
      throw new NotImplementedException();
    }
  }
}
