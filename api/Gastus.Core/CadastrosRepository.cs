using System.Data.SQLite;

using Dapper;

using Gastus.Domain;

namespace Gastus.Core
{
  /// <summary>
  /// Inicialização da classe: <see cref="CadastrosRepository"/>.
  /// </summary>
  /// <param name="databaseFileName">Database file name</param>
  public class CadastrosRepository(string databaseFileName) :
    GastusBaseRepository(databaseFileName), ICadastrosRepository
  {
    /// <summary>
    /// Recuperar o próximo Id da SubCategoria
    /// </summary>
    /// <param name="connection">Conexão com o banco de dados</param>
    /// <param name="idCategoria">Identificador da Categoria</param>
    /// <returns>Próximo Id</returns>
    static int GetNextSubCategoriaId(SQLiteConnection connection, int idCategoria)
    {
      const string sql = @"
        SELECT IFNULL(MAX(Id), 0) + 1 NextId 
        FROM SUBCATEGORIA
        WHERE IDCATEGORIA = @idCategoria";
      int nextId = connection.QuerySingle<int>(sql, new { idCategoria });
      return nextId;
    }

    /// <summary>
    /// Recuperar o próximo Id de uma tabela
    /// </summary>
    /// <param name="connection">Conexão com o banco de dados</param>
    /// <param name="tableName">Nome da tabela</param>
    /// <returns>Próximo Id</returns>
    static int GetNextIdFromTabela(SQLiteConnection connection, string tableName)
    {
      string sql = $"SELECT IFNULL(MAX(Id), 0) + 1 NextId FROM {tableName};";
      int nextId = connection.QuerySingle<int>(sql);
      return nextId;
    }

    /// <summary>
    /// Recuperar todas as subCategorias
    /// </summary>
    /// <param name="connection">Conexão com o banco de dados</param>
    /// <param name="idCategoria">Identificador da categoria</param>
    /// <returns>SubCategorias</returns>
    static List<SubCategoriaModel> GetAllSubCategorias(SQLiteConnection connection, int? idCategoria)
    {
      string sql = @"SELECT * FROM SUBCATEGORIA";
      object param = null;
      if (idCategoria != null)
      {
        sql += " WHERE IDCATEGORIA = @idCategoria";
        param = new { idCategoria };
      }
      List<SubCategoriaModel> subCategorias = connection.Query<SubCategoriaModel>(sql, param)
        .ToList();
      return subCategorias;
    }

    /// <summary>
    /// Recuperar todas as categorias
    /// </summary>
    /// <param name="loadSubs">true para carregar as subcategorias</param>
    /// <returns>Todas as categorias</returns>
    public List<CategoriaModel> GetAllCategorias(bool loadSubs)
    {
      using SQLiteConnection connection = GetConnection(false);
      var query = "SELECT Id, Nome FROM Categoria";

      var categorias = connection.Query<CategoriaModel>(query).ToList();
      if (loadSubs)
        categorias.ForEach(c => c.SubCategorias = GetAllSubCategorias(connection, c.Id));
      return categorias;
    }

    /// <summary>
    /// Adicionar uma categoria
    /// </summary>
    /// <param name="categoria">Categoria a ser adicionada</param>
    /// <returns>Nova categoria</returns>
    public CategoriaModel AddCategoria(BaseInsertModel categoria)
    {
      using var connection = GetConnection(false);

      var query = "INSERT INTO Categoria (Id, Nome) VALUES (@Id, @Nome)";
      var novaCategoria = new CategoriaModel(GetNextIdFromTabela(connection, "Categoria"), categoria.Nome);
      int rows = connection.Execute(query, novaCategoria);
      System.Diagnostics.Trace.WriteLine(rows);
      return novaCategoria;
    }

    /// <summary>
    /// Excluir uma categoria
    /// </summary>
    /// <param name="id">Identificador da categoria a ser excluída</param>
    /// <returns>Número de linhas afetadas na exclusão</returns>
    public int DeleteCategoria(int id)
    {
      using SQLiteConnection connection = GetConnection(true);
      var commandText = "DELETE FROM Categoria WHERE Id = @id";
      int rows = connection.Execute(commandText, new { id });
      return rows;
    }

    /// <summary>
    /// Recuperar uma categoria
    /// </summary>
    /// <param name="id">Identificador da categoria a ser recuperada</param>
    /// <returns>Categoria</returns>
    public CategoriaModel GetCategoria(int id)
    {
      const string sqlCategoria = "SELECT * FROM CATEGORIA WHERE Id = @id";
      using var connection = GetConnection(false);
      CategoriaModel categoria = connection.QueryFirstOrDefault<CategoriaModel>(sqlCategoria, new { id });
      if (categoria == null)
        return null;

      const string sqlSubCategoria = "SELECT * FROM SUBCATEGORIA WHERE IdCategoria = @id";
      categoria.SubCategorias = connection.Query<SubCategoriaModel>(sqlSubCategoria, new { id }).ToList();
      return categoria;
    }

    /// <summary>
    /// Editar uma Categoria
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>Número de registros afetados</returns>
    public int EditCategoria(BaseEditModel model)
    {
      const string sql = "UPDATE CATEGORIA SET NOME = @Nome WHERE ID = @Id";
      using var connection = GetConnection(false);
      int rows = connection.Execute(sql, model);
      return rows;
    }

    /// <summary>
    /// Recuperar todas as subCategorias
    /// </summary>
    /// <param name="idCategoria">Identificador da categoria</param>
    /// <returns>SubCategorias</returns>
    public List<SubCategoriaModel> GetAllSubCategorias(int? idCategoria)
    {
      using var connection = GetConnection(false);
      List<SubCategoriaModel> subCategorias = GetAllSubCategorias(connection, idCategoria);
      return subCategorias;
    }

    /// <summary>
    /// Recuperar uma subcategoria
    /// </summary>
    /// <param name="idCategoria">Identificador da categoria</param>
    /// <param name="id">Identificador da subcategoria</param>
    /// <returns>Sub categoria</returns>
    public SubCategoriaModel GetSubCategoria(int idCategoria, int id)
    {
      const string sql = @"
        SELECT * FROM SUBCATEGORIA
        WHERE IDCATEGORIA = @idCategoria
          AND ID = @id";
      var connection = GetConnection(false);
      SubCategoriaModel subCategoria = connection.QueryFirstOrDefault<SubCategoriaModel>(sql,
        new { idCategoria, id });
      return subCategoria;
    }

    /// <summary>
    /// Adicionar uma subcategoria
    /// </summary>
    /// <param name="model">Dados da inserção</param>
    /// <returns>SubCategoria inserida</returns>
    public SubCategoriaModel AddSubCategoria(SubCategoriaInsertModel model)
    {
      const string sql = @"
        INSERT INTO SUBCATEGORIA (IDCATEGORIA, ID, NOME)
        VALUES (@IdCategoria, @Id, @Nome)";
      var connection = GetConnection(false);
      var nova = new SubCategoriaModel(model.IdCategoria,
        GetNextSubCategoriaId(connection, model.IdCategoria), model.Nome);
      int rows = connection.Execute(sql, nova);
      System.Diagnostics.Trace.WriteLine(rows);
      return nova;
    }

    /// <summary>
    /// Excluir uma subcategoria
    /// </summary>
    /// <param name="idCategoria">Identificador da Categoria</param>
    /// <param name="id">Identificador da categoria a ser excluída</param>
    /// <returns>Linhas afetadas</returns>
    public int DeleteSubCategoria(int idCategoria, int id)
    {
      const string sql = @"
        DELETE FROM SUBCATEGORIA
        WHERE IdCategoria = @idCategoria
          AND Id = @id";
      var connection = GetConnection(false);
      int rows = connection.Execute(sql, new { idCategoria, id });
      return rows;
    }

    /// <summary>
    /// Editar uma subcategoria
    /// </summary>
    /// <param name="model">Dados da alteração</param>
    /// <returns>Linhas afetadas</returns>
    public int EditSubCategoria(SubCategoriaModel model)
    {
      const string sql = @"
        UPDATE SUBCATEGORIA
        SET NOME = @Nome
        WHERE IDCATEGORIA = @IdCategoria
          AND ID = @Id";
      var connection = GetConnection(false);
      int rows = connection.Execute(sql, model);
      return rows;
    }

    /// <summary>
    /// Recuperar todos os Tipos de transação
    /// </summary>
    /// <returns>Todas os Tipos de transação</returns>
    public List<TipoTransacaoModel> GetAllTiposTransacao()
    {
      using SQLiteConnection connection = GetConnection(false);
      var query = "SELECT Id, Nome FROM TipoTransacao";

      var tiposTransacao = connection.Query<TipoTransacaoModel>(query).ToList();
      return tiposTransacao;
    }

    /// <summary>
    /// Recuperar um Tipo de Transação
    /// </summary>
    /// <param name="id">Identificador do Tipo de transação</param>
    /// <returns>Tipo de transação</returns>
    public TipoTransacaoModel GetTipoTransacao(int id)
    {
      const string sql = "SELECT * FROM TipoTransacao WHERE Id = @id";
      using var connection = GetConnection(false);
      TipoTransacaoModel tipoTransacao = connection.QueryFirstOrDefault<TipoTransacaoModel>(sql, new { id });
      return tipoTransacao;
    }

    /// <summary>
    /// Adicionar um Tipo de transação
    /// </summary>
    /// <param name="model">Dados da inserção</param>
    /// <returns>Novo Tipo de transação</returns>
    public TipoTransacaoModel AddTipoTransacao(BaseInsertModel model)
    {
      using var connection = GetConnection(false);

      var query = "INSERT INTO TipoTransacao (Id, Nome) VALUES (@Id, @Nome)";
      var novoTipoTransacao = new TipoTransacaoModel(GetNextIdFromTabela(connection, "TipoTransacao"), model.Nome);
      int rows = connection.Execute(query, novoTipoTransacao);
      System.Diagnostics.Trace.WriteLine(rows);
      return novoTipoTransacao;
    }

    /// <summary>
    /// Excluir um Tipo de transação
    /// </summary>
    /// <param name="id">Identificador do Tipo de transação ser excluído</param>
    /// <returns>Número de linhas afetadas na exclusão</returns>
    public int DeleteTipoTransacao(int id)
    {
      using SQLiteConnection connection = GetConnection(true);
      var commandText = "DELETE FROM TipoTransacao WHERE Id = @id";
      int rows = connection.Execute(commandText, new { id });
      return rows;
    }

    /// <summary>
    /// Editar um Tipo de transação
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>Número de registros afetados</returns>
    public int EditTipoTransacao(TipoTransacaoModel model)
    {
      const string sql = "UPDATE TipoTransacao SET NOME = @Nome WHERE ID = @Id";
      using var connection = GetConnection(false);
      int rows = connection.Execute(sql, model);
      return rows;
    }

    /// <summary>
    /// Recuperar todas as Aplicações cadastradas
    /// </summary>
    /// <returns>Aplicações com seus respectivos lançamentos</returns>
    public List<AplicacaoModel> GetAllAplicacoes()
    {
      using SQLiteConnection connection = GetConnection(false);
      var query = "SELECT Id, Nome FROM Aplicacao";

      var aplicacoes = connection.Query<AplicacaoModel>(query).ToList();
      return aplicacoes;
    }

    /// <summary>
    /// Recuperar uma aplicação
    /// </summary>
    /// <param name="id">Identificador da aplicação</param>
    /// <returns>Aplicação</returns>
    public AplicacaoModel GetAplicacao(int id)
    {
      throw new NotImplementedException();
    }

    /// <summary>
    /// Adicionar uma Aplicação
    /// </summary>
    /// <param name="insertModel">Modelo de inserção</param>
    /// <returns>Aplicação inserida</returns>
    public AplicacaoModel AddAplicacao(BaseInsertModel insertModel)
    {
      using var connection = GetConnection(false);

      var query = "INSERT INTO Aplicacao (Id, Nome) VALUES (@Id, @Nome)";
      var novaAplicacao = new AplicacaoModel(GetNextIdFromTabela(connection, "Aplicacao"), insertModel.Nome);
      _ = connection.Execute(query, novaAplicacao);
      return novaAplicacao;
    }

    /// <summary>
    /// Excluir uma Aplicação
    /// </summary>
    /// <param name="id">Identificador da aplicação a ser excluída</param>
    /// <returns>Número de registros excluídos</returns>
    public int DeleteAplicacao(int id)
    {
      return DeleteById("Aplicacao", id);
    }

    /// <summary>
    /// Editar uma Aplicação
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>Número de registros alterados</returns>
    public int EditAplicacao(BaseEditModel model)
    {
      throw new NotImplementedException();
    }
  }
}
