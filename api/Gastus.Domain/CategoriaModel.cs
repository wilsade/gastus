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

    /// <summary>
    /// Lista de Sub categorias
    /// </summary>
    public List<SubCategoriaModel> SubCategorias { get; set; } = [];

    /// <summary>
    /// Retorna uma string representando esta instância
    /// </summary>
    /// <returns>string representando esta instância</returns>
    public override string ToString() => $"[{Id}] {Nome} (Filhas={SubCategorias.Count})";
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
