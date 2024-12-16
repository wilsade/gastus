namespace Gastus.Domain
{
  /// <summary>
  /// Representa o relatório de Previsto x Realizado
  /// </summary>
  public class RelatPrevistoRealizadoModel
  {
    /// <summary>
    /// Inicialização da classe: <see cref="RelatPrevistoRealizadoModel"/>.
    /// </summary>
    public RelatPrevistoRealizadoModel()
    {

    }

    /// <summary>
    /// Inicialização da classe: <see cref="RelatPrevistoRealizadoModel"/>.
    /// </summary>
    /// <param name="numMes">Número do mês</param>
    /// <param name="nomeMes">Nome do mês</param>
    public RelatPrevistoRealizadoModel(int numMes, string nomeMes)
    {
      NumMes = numMes;
      NomeMes = nomeMes;
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
    /// Categorias
    /// </summary>
    public List<CategoriaPrevistoRealizadoRelatModel> Categorias { get; set; } = [];

    /// <summary>
    /// Total previsto
    /// </summary>
    public decimal TotalPrevisto => Categorias.Sum(c => c.TotalPrevisto);

    /// <summary>
    /// Total realizado
    /// </summary>
    public decimal TotalRealizado => Categorias.Sum(c => c.TotalRealizado);

    /// <summary>
    /// Retorna uma string representando esta instância
    /// </summary>
    /// <returns>string representando esta instância</returns>
    public override string ToString() => $"{NomeMes} [{TotalPrevisto}] - [{TotalRealizado}]";
  }

  /// <summary>
  /// Representa um item de Previsto x Realizado
  /// </summary>
  public class CategoriaPrevistoRealizadoRelatModel
  {
    /// <summary>
    /// Inicialização da classe: <see cref="CategoriaPrevistoRealizadoRelatModel"/>.
    /// </summary>
    public CategoriaPrevistoRealizadoRelatModel()
    {

    }

    /// <summary>
    /// Inicialização da classe: <see cref="CategoriaPrevistoRealizadoRelatModel"/>.
    /// </summary>
    /// <param name="idCategoria">Identificador da categoria</param>
    /// <param name="nomeCategoria">Nome da categoria</param>
    /// <param name="totalPrevisto">Total previsto</param>
    /// <param name="totalRealizado">Total realizado</param>
    public CategoriaPrevistoRealizadoRelatModel(int idCategoria, string nomeCategoria, decimal totalPrevisto, decimal totalRealizado)
    {
      IdCategoria = idCategoria;
      NomeCategoria = nomeCategoria;
      TotalPrevisto = totalPrevisto;
      TotalRealizado = totalRealizado;
    }

    /// <summary>
    /// Identificador da categoria
    /// </summary>
    public int IdCategoria { get; set; }

    /// <summary>
    /// Nome da categoria
    /// </summary>
    public string NomeCategoria { get; set; }

    /// <summary>
    /// Total previsto
    /// </summary>
    public decimal TotalPrevisto { get; set; }

    /// <summary>
    /// Total realizado
    /// </summary>
    public decimal TotalRealizado { get; set; }

    /// <summary>
    /// Retorna uma string representando esta instância
    /// </summary>
    /// <returns>string representando esta instância</returns>
    public override string ToString() => $"{NomeCategoria} [{TotalPrevisto}] - [{TotalRealizado}]";

    /// <summary>
    /// Retorna um código hash para esta instância,
    /// adequado para uso em algoritmos hash e estrutura de dados como uma tabela hash.
    /// </summary>
    /// <returns>Código hash para esta instância</returns>
    public override int GetHashCode() => IdCategoria.GetHashCode();

    /// <summary>
    /// Indica se este objeto é igual a outro
    /// </summary>
    /// <param name="obj">Obj</param>
    /// <returns>true se o objeto é igual a outro</returns>
    public override bool Equals(object obj)
    {
      if (obj is not CategoriaPrevistoRealizadoRelatModel other)
        return false;
      return other.IdCategoria == IdCategoria;
    }
  }
}
