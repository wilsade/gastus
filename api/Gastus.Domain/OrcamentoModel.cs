namespace Gastus.Domain
{
  /// <summary>
  /// Representa um item básico de Orçamento
  /// </summary>
  public abstract class OrcamentoBaseModel
  {
    /// <summary>
    /// Identificador da categoria.
    /// </summary>
    public int IdCategoria { get; set; }

    /// <summary>
    /// Identificador da subcategoria.
    /// </summary>
    public int IdSubCategoria { get; set; }

    /// <summary>
    /// Valor do orçamento.
    /// </summary>
    public decimal Valor { get; set; }

    /// <summary>
    /// Descrição opcional do orçamento.
    /// </summary>
    public string Descricao { get; set; }
  }

  /// <summary>
  /// Representa um item de Orçamento
  /// </summary>
  public class OrcamentoModel : OrcamentoBaseModel
  {
    /// <summary>
    /// Inicialização da classe: <see cref="OrcamentoModel"/>.
    /// </summary>
    public OrcamentoModel()
    {

    }

    /// <summary>
    /// Inicialização da classe: <see cref="OrcamentoModel"/>.
    /// </summary>
    /// <param name="id">Identificador</param>
    /// <param name="idCategoria">Identificador da categoria.</param>
    /// <param name="idSubCategoria">Identificador da subcategoria.</param>
    /// <param name="numMes">Número do mês (1 a 12).</param>
    /// <param name="valor">Valor do orçamento.</param>
    /// <param name="descricao">Descrição opcional do orçamento.</param>
    public OrcamentoModel(int id, int idCategoria, int idSubCategoria,
      int numMes, decimal valor, string descricao)
    {
      Id = id;
      IdCategoria = idCategoria;
      IdSubCategoria = idSubCategoria;
      NumMes = numMes;
      Valor = valor;
      Descricao = descricao;
    }

    /// <summary>
    /// Identificador
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Nome da categoria
    /// </summary>
    public string NomeCategoria { get; set; }

    /// <summary>
    /// Nome da subcategoria
    /// </summary>
    public string NomeSubCategoria { get; set; }

    /// <summary>
    /// Número do mês (1 a 12).
    /// </summary>
    public int NumMes { get; set; }
  }

  /// <summary>
  /// Representa um item de Orçamento
  /// </summary>
  public class OrcamentoInsertModel : OrcamentoBaseModel
  {
    /// <summary>
    /// Inicialização da classe: <see cref="OrcamentoInsertModel"/>.
    /// </summary>
    public OrcamentoInsertModel()
    {

    }

    /// <summary>
    /// Inicialização da classe: <see cref="OrcamentoInsertModel"/>.
    /// </summary>
    /// <param name="idCategoria">Identificador da categoria.</param>
    /// <param name="idSubCategoria">Identificador da subcategoria.</param>
    /// <param name="numMeses">Números dos meses (1 a 12).</param>
    /// <param name="valor">Valor do orçamento.</param>
    /// <param name="descricao">Descrição opcional do orçamento.</param>
    public OrcamentoInsertModel(int idCategoria, int idSubCategoria,
      int[] numMeses, decimal valor, string descricao)
    {
      IdCategoria = idCategoria;
      IdSubCategoria = idSubCategoria;
      NumMeses = numMeses;
      Valor = valor;
      Descricao = descricao;
    }

    /// <summary>
    /// Número do mês (1 a 12).
    /// </summary>
    public int[] NumMeses { get; set; }
  }

  /// <summary>
  /// Representa uma visão de orçamento por mês
  /// </summary>
  public class OrcamentoViewModel
  {
    /// <summary>
    /// Número do mês (1 a 12).
    /// </summary>
    public int NumMes { get; set; }

    /// <summary>
    /// Total orçado para o mês
    /// </summary>
    public decimal Total { get; set; }

    /// <summary>
    /// Itens orçados para o mês
    /// </summary>
    public List<OrcamentoModel> Items { get; set; } = [];

    /// <summary>
    /// Retorna um código hash para esta instância,
    /// adequado para uso em algoritmos hash e estrutura de dados como uma tabela hash.
    /// </summary>
    /// <returns>Código hash para esta instância</returns>
    public override int GetHashCode()
    {
      return NumMes.GetHashCode();
    }

    /// <summary>
    /// Indica se este objeto é igual a outro
    /// </summary>
    /// <param name="obj">Obj</param>
    /// <returns>true se o objeto é igual a outro</returns>
    public override bool Equals(object obj)
    {
      if (obj is not OrcamentoViewModel other)
        return false;
      return NumMes == other.NumMes;
    }
  }
}
