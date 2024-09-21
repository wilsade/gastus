using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    protected override int GetNextId()
    {
      using var connection = GetConnection();
      const string sql = "SELECT IFNULL(MAX(id), 0) + 1 NextId FROM CATEGORIA;";
      int nextId = connection.QuerySingle(sql);
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

      var bla = connection.Query<CategoriaModel>(query).ToList();

      using var command = new SQLiteCommand(query, connection);
      var categorias = new List<CategoriaModel>();

      using (var reader = command.ExecuteReader())
      {
        while (reader.Read())
        {
          var categoria = new CategoriaModel(reader.GetInt32(0), reader.GetString(1));
          categorias.Add(categoria);
        }
      }

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

      var query = "INSERT INTO Categoria (id, nome) VALUES (@id, @nome)";
      var novaCategoria = new CategoriaModel(GetNextId(), categoria.Nome);
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
      var commandText = "DELETE FROM Categoria WHERE Id = @Id";
      int rows = connection.Execute(commandText, new { id });
      return rows;
    }
  }
}
