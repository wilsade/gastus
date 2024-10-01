namespace Gastus.Domain
{
  /// <summary>
  /// Serviços para o repositório
  /// </summary>
  public interface ICategoriasRepository
  {
    /// <summary>
    /// Recuperar todas as categorias
    /// </summary>
    /// <returns>Todas as categorias</returns>
    List<CategoriaModel> GetAllCategorias();

    /// <summary>
    /// Adicionar uma categoria
    /// </summary>
    /// <param name="categoria">Categoria a ser adicionada</param>
    /// <returns>Nova categoria</returns>
    CategoriaModel AddCategoria(CategoriaInsertModel categoria);

    /// <summary>
    /// Excluir uma categoria
    /// </summary>
    /// <param name="id">Identificador da categoria a ser excluída</param>
    /// <returns>Número de linhas afetadas na exclusão</returns>
    int DeleteCategoria(int id);

    /// <summary>
    /// Recuperar uma categoria
    /// </summary>
    /// <param name="id">Identificador da categoria a ser recuperada</param>
    /// <returns>Categoria</returns>
    CategoriaModel GetCategoria(int id);

    /// <summary>
    /// Editar uma Categoria
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>Número de registros afetados</returns>
    int EditCategoria(CategoriaEditModel model);

    /// <summary>
    /// Recuperar todas as subCategorias
    /// </summary>
    /// <param name="idCategoria">Identificador da categoria</param>
    /// <returns>SubCategorias</returns>
    List<SubCategoriaModel> GetAllSubCategorias(int? idCategoria);

    /// <summary>
    /// Recuperar uma subcategoria
    /// </summary>
    /// <param name="idCategoria">Identificador da categoria</param>
    /// <param name="id">Identificador da subcategoria</param>
    /// <returns>Sub categoria</returns>
    SubCategoriaModel GetSubCategoria(int idCategoria, int id);

    /// <summary>
    /// Adicionar uma subcategoria
    /// </summary>
    /// <param name="model">Dados da inserção</param>
    /// <returns>SubCategoria inserida</returns>
    SubCategoriaModel AddSubCategoria(SubCategoriaInsertModel model);

    /// <summary>
    /// Excluir uma subcategoria
    /// </summary>
    /// <param name="idCategoria">Identificador da categoria</param>
    /// <param name="id">Identificador da subcategoria a ser excluída</param>
    /// <returns>Linhas afetadas</returns>
    int DeleteSubCategoria(int idCategoria, int id);

    /// <summary>
    /// Editar uma subcategoria
    /// </summary>
    /// <param name="model">Dados da alteração</param>
    /// <returns>Linhas afetadas</returns>
    int EditSubCategoria(SubCategoriaModel model);
  }
}
