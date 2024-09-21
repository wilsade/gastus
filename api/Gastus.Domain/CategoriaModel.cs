namespace Gastus.Domain
{
  /// <summary>
  /// Representa um item de Categoria
  /// </summary>
  public class CategoriaModel : BaseModel
  {
    /// <summary>
    /// Inicialização da classe: <see cref="CategoriaModel"/>.
    /// </summary>
    public CategoriaModel()
    {

    }

    /// <summary>
    /// Inicialização da classe: <see cref="CategoriaModel"/>.
    /// </summary>
    /// <param name="id">Identificador da categoria</param>
    /// <param name="nome">Nome</param>
    public CategoriaModel(int id, string nome)
    {
      Id = id;
      Nome = nome;
    }

    /// <summary>
    /// Nome
    /// </summary>
    public string Nome { get; set; }
  }

  /// <summary>
  /// Representa um item de Categoria para inserção
  /// </summary>
  public class CategoriaInsertModel
  {
    /// <summary>
    /// Nome
    /// </summary>
    public string Nome { get; set; }
  }
}
