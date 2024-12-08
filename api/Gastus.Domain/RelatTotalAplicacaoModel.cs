namespace Gastus.Domain
{
  /// <summary>
  /// Representa um item de Total de aplicação
  /// </summary>
  public class RelatTotalAplicacaoModel
  {
    /// <summary>
    /// Nome da aplicação
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
}
