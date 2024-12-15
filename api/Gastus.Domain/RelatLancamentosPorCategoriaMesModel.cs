namespace Gastus.Domain
{
  /// <summary>
  /// Representa um Relatório de Lançamentos por mês
  /// </summary>
  public class RelatLancamentosPorCategoriaMesModel
  {
    /// <summary>
    /// Inicialização da classe: <see cref="RelatLancamentosPorCategoriaMesModel"/>.
    /// </summary>
    public RelatLancamentosPorCategoriaMesModel()
    {

    }

    /// <summary>
    /// Inicialização da classe: <see cref="RelatLancamentosPorCategoriaMesModel"/>.
    /// </summary>
    /// <param name="numMes">Número do mês</param>
    /// <param name="nomeMes">Nome do mês</param>
    /// <param name="total">Total</param>
    public RelatLancamentosPorCategoriaMesModel(int numMes, string nomeMes, decimal total)
    {
      NumMes = numMes;
      NomeMes = nomeMes;
      Total = total;
    }

    /// <summary>
    /// Inicialização da classe: <see cref="RelatLancamentosPorCategoriaMesModel"/>.
    /// </summary>
    /// <param name="numMes">Número do mês</param>
    /// <param name="nomeMes">Nome do mês</param>
    /// <param name="categorias">Lançamentos por Categoria</param>
    public RelatLancamentosPorCategoriaMesModel(int numMes, string nomeMes, IEnumerable<RelatLancamentosDaCategoriaModel> categorias)
    {
      NumMes = numMes;
      NomeMes = nomeMes;
      Categorias = categorias.ToList();
      Total = categorias.Sum(x => x.Valor);
    }

    /// <summary>
    /// Número do mês
    /// </summary>
    public int NumMes { get; set; }

    /// <summary>
    /// Nome do mês
    /// </summary>
    public string NomeMes { get; set; }

    /// <summary>
    /// Total de Lançamentos da Categoria
    /// </summary>
    public List<RelatLancamentosDaCategoriaModel> Categorias { get; set; } = [];

    /// <summary>
    /// Total
    /// </summary>
    public decimal Total { get; set; }

    /// <summary>
    /// Retorna uma string representando esta instância
    /// </summary>
    /// <returns>string representando esta instância</returns>
    public override string ToString() => $"{NomeMes}: {Total}";
  }

  /// <summary>
  /// Representa um totalizador de Lançamentos por Categoria
  /// </summary>
  public class RelatTotalCategoriaModel
  {
    /// <summary>
    /// Inicialização da classe: <see cref="RelatTotalCategoriaModel"/>.
    /// </summary>
    public RelatTotalCategoriaModel()
    {

    }

    /// <summary>
    /// Inicialização da classe: <see cref="RelatTotalCategoriaModel"/>.
    /// </summary>
    /// <param name="codigo">Código</param>
    /// <param name="nome">Nome</param>
    /// <param name="valor">Valor</param>
    public RelatTotalCategoriaModel(int codigo, string nome, decimal valor)
    {
      Codigo = codigo;
      Nome = nome;
      Valor = valor;
    }

    /// <summary>
    /// Código
    /// </summary>
    public int Codigo { get; set; }

    /// <summary>
    /// Nome
    /// </summary>
    public string Nome { get; set; }

    /// <summary>
    /// Valor
    /// </summary>
    public decimal Valor { get; set; }

    /// <summary>
    /// Retorna uma string representando esta instância
    /// </summary>
    /// <returns>string representando esta instância</returns>
    public override string ToString() => $"{Nome} - {Valor}";
  }

  /// <summary>
  /// Representa os Lançamentos da Categoria
  /// </summary>
  public class RelatLancamentosDaCategoriaModel : RelatTotalCategoriaModel
  {
    /// <summary>
    /// Inicialização da classe: <see cref="RelatLancamentosDaCategoriaModel"/>.
    /// </summary>
    public RelatLancamentosDaCategoriaModel()
    {

    }

    /// <summary>
    /// Inicialização da classe: <see cref="RelatLancamentosDaCategoriaModel"/>.
    /// </summary>
    /// <param name="codigo">Código</param>
    /// <param name="nome">Nome</param>
    /// <param name="valor">Valor</param>
    public RelatLancamentosDaCategoriaModel(int codigo, string nome, decimal valor) : base(codigo, nome, valor)
    {
    }

    /// <summary>
    /// Lançamentos da Categoria
    /// </summary>
    public List<RelatTotalCategoriaModel> Lancamentos { get; set; }
  }
}
