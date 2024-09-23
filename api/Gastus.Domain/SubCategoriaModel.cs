namespace Gastus.Domain
{
  /// <summary>
  /// Representa um item de SubCategoria
  /// </summary>
  public class SubCategoriaModel : BaseModel
  {
    /// <summary>
    /// Inicialização da classe: <see cref="SubCategoriaModel"/>.
    /// </summary>
    public SubCategoriaModel()
    {

    }

    /// <summary>
    /// Inicialização da classe: <see cref="SubCategoriaModel"/>.
    /// </summary>
    /// <param name="idCategoria">Identificador da categoria</param>
    /// <param name="id">Identificador</param>
    /// <param name="nome">Nome da subcategoria</param>
    public SubCategoriaModel(int idCategoria, int id, string nome)
    {
      IdCategoria = idCategoria;
      Nome = nome;
      Id = id;
    }

    /// <summary>
    /// Identificador da categoria
    /// </summary>
    public int IdCategoria { get; set; }

    /// <summary>
    /// Nome da subcategoria
    /// </summary>
    public string Nome { get; set; }

    /// <summary>
    /// Retorna uma string representando esta instância
    /// </summary>
    /// <returns>string representando esta instância</returns>
    public override string ToString() => Nome;
  }

  /// <summary>
  /// Representa um item de inserção de SubCategoria
  /// </summary>
  public class SubCategoriaInsertModel
  {
    /// <summary>
    /// Identificador da categoria
    /// </summary>
    public int IdCategoria { get; set; }

    /// <summary>
    /// Nome da subcategoria
    /// </summary>
    public string Nome { get; set; }
  }
}
