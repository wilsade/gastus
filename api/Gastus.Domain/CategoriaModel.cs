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

    /// <summary>
    /// Retorna um código hash para esta instância,
    /// adequado para uso em algoritmos hash e estrutura de dados como uma tabela hash.
    /// </summary>
    /// <returns>Código hash para esta instância</returns>
    public override int GetHashCode() => Id.GetHashCode();

    /// <summary>
    /// Indica se este objeto é igual a outro
    /// </summary>
    /// <param name="obj">Obj</param>
    /// <returns>true se o objeto é igual a outro</returns>
    public override bool Equals(object obj)
    {
      if (obj is not CategoriaModel other)
        return false;
      return other.Id == Id;
    }
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
