namespace Gastus.Domain
{
  /// <summary>
  /// Representa um item de Categoria
  /// </summary>
  public class CategoriaModel : CategoriaEditModel
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
  /// Representa um item de Categoria para edição
  /// </summary>
  public class CategoriaEditModel : CategoriaInsertModel
  {
    /// <summary>
    /// Identificador do modelo
    /// </summary>
    public int Id { get; set; }
  }

  /// <summary>
  /// Representa um item de Categoria para inserção
  /// </summary>
  public class CategoriaInsertModel : BaseInsertModel
  {
    /// <summary>
    /// Indica se a Categoria representa uma receita
    /// </summary>
    public bool IndicaReceita { get; set; } = false;

    /// <summary>
    /// Indica se a Categoria será incluída no relatorio
    /// </summary>
    public bool SaiNoRelatorio { get; set; } = true;
  }
}
