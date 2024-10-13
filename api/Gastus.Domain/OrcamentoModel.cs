namespace Gastus.Domain
{
  /// <summary>
  /// Representa um item de Orçamento
  /// </summary>
  public class OrcamentoModel : OrcamentoInsertModel
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
    /// <param name="nomeMes">Nome do mês correspondente ao orçamento.</param>
    /// <param name="valor">Valor do orçamento.</param>
    /// <param name="descricao">Descrição opcional do orçamento.</param>
    public OrcamentoModel(int id, int idCategoria, int idSubCategoria,
      int numMes, string nomeMes, decimal valor, string descricao)
    {
      Id = id;
      IdCategoria = idCategoria;
      IdSubCategoria = idSubCategoria;
      NumMes = numMes;
      NomeMes = nomeMes;
      Valor = valor;
      Descricao = descricao;
    }

    /// <summary>
    /// Identificador
    /// </summary>
    public int Id { get; set; }
  }

  /// <summary>
  /// Representa um item de Orçamento
  /// </summary>
  public class OrcamentoInsertModel
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
    /// <param name="numMes">Número do mês (1 a 12).</param>
    /// <param name="nomeMes">Nome do mês correspondente ao orçamento.</param>
    /// <param name="valor">Valor do orçamento.</param>
    /// <param name="descricao">Descrição opcional do orçamento.</param>
    public OrcamentoInsertModel(int idCategoria, int idSubCategoria,
      int numMes, string nomeMes, decimal valor, string descricao)
    {
      IdCategoria = idCategoria;
      IdSubCategoria = idSubCategoria;
      NumMes = numMes;
      NomeMes = nomeMes;
      Valor = valor;
      Descricao = descricao;
    }

    /// <summary>
    /// Identificador da categoria.
    /// </summary>
    public int IdCategoria { get; set; }

    /// <summary>
    /// Identificador da subcategoria.
    /// </summary>
    public int IdSubCategoria { get; set; }

    /// <summary>
    /// Número do mês (1 a 12).
    /// </summary>
    public int NumMes { get; set; }

    /// <summary>
    /// Nome do mês correspondente ao orçamento.
    /// </summary>
    public string NomeMes { get; set; }

    /// <summary>
    /// Valor do orçamento.
    /// </summary>
    public decimal Valor { get; set; }

    /// <summary>
    /// Descrição opcional do orçamento.
    /// </summary>
    public string Descricao { get; set; }
  }
}
