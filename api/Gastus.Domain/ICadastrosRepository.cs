namespace Gastus.Domain
{
  /// <summary>
  /// Serviços para o repositório
  /// </summary>
  public interface ICadastrosRepository
  {
    /// <summary>
    /// Recuperar todas as categorias
    /// </summary>
    /// <param name="loadSubs">true para carregar as subcategorias</param>
    /// <returns>Todas as categorias</returns>
    List<CategoriaModel> GetAllCategorias(bool loadSubs);

    /// <summary>
    /// Adicionar uma categoria
    /// </summary>
    /// <param name="categoria">Categoria a ser adicionada</param>
    /// <returns>Nova categoria</returns>
    CategoriaModel AddCategoria(BaseInsertModel categoria);

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
    int EditCategoria(BaseEditModel model);

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

    /// <summary>
    /// Recuperar todos os Tipos de transação
    /// </summary>
    /// <returns>Todas os Tipos de transação</returns>
    List<TipoTransacaoModel> GetAllTiposTransacao();

    /// <summary>
    /// Recuperar um Tipo de Transação
    /// </summary>
    /// <param name="id">Identificador do Tipo de transação</param>
    /// <returns>Tipo de transação</returns>
    TipoTransacaoModel GetTipoTransacao(int id);

    /// <summary>
    /// Adicionar um Tipo de transação
    /// </summary>
    /// <param name="model">Tipo de transação a ser adicionada</param>
    /// <returns>Novo Tipo de transação </returns>
    TipoTransacaoModel AddTipoTransacao(BaseInsertModel model);

    /// <summary>
    /// Excluir um Tipo de transação
    /// </summary>
    /// <param name="id">Identificador do Tipo de transação a ser excluído</param>
    /// <returns>Número de linhas afetadas na exclusão</returns>
    int DeleteTipoTransacao(int id);

    /// <summary>
    /// Editar um Tipo de transação
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>Número de registros afetados</returns>
    int EditTipoTransacao(TipoTransacaoModel model);

    /// <summary>
    /// Recuperar todas as Aplicações cadastradas
    /// </summary>
    /// <returns>Aplicações com seus respectivos lançamentos</returns>
    List<AplicacaoModel> GetAllAplicacoes();

    /// <summary>
    /// Recuperar uma aplicação
    /// </summary>
    /// <param name="id">Identificador da aplicação</param>
    /// <returns>Aplicação</returns>
    AplicacaoModel GetAplicacao(int id);

    /// <summary>
    /// Adicionar uma Aplicação
    /// </summary>
    /// <param name="insertModel">Modelo de inserção</param>
    /// <returns>Aplicação inserida</returns>
    AplicacaoModel AddAplicacao(BaseInsertModel insertModel);

    /// <summary>
    /// Excluir uma Aplicação
    /// </summary>
    /// <param name="id">Identificador da aplicação a ser excluída</param>
    /// <returns>Número de registros excluídos</returns>
    int DeleteAplicacao(int id);

    /// <summary>
    /// Editar uma Aplicação
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>Número de registros alterados</returns>
    int EditAplicacao(BaseEditModel model);
  }
}
