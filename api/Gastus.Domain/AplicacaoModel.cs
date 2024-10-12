namespace Gastus.Domain
{
  /// <summary>
  /// Representa um item de aplicação
  /// </summary>
  public class AplicacaoModel : BaseModel
  {
    /// <summary>
    /// Inicialização da classe: <see cref="AplicacaoModel"/>.
    /// </summary>
    public AplicacaoModel()
    {

    }

    /// <summary>
    /// Inicialização da classe: <see cref="AplicacaoModel"/>.
    /// </summary>
    /// <param name="id">Identificador</param>
    /// <param name="nome">Nome</param>
    public AplicacaoModel(int id, string nome)
    {
      Id = id;
      Nome = nome;
    }

    /// <summary>
    /// Nome
    /// </summary>
    public string Nome { get; set; }

    /// <summary>
    /// Lançamentos
    /// </summary>
    public List<LancamentoAplicacaoModel> Lancamentos { get; set; } = [];

    /// <summary>
    /// Retorna uma string representando esta instância
    /// </summary>
    /// <returns>string representando esta instância</returns>
    public override string ToString() => $"[{Id}] {Nome} (Filhos={Lancamentos.Count})";
  }

  /// <summary>
  /// Representa um Lançamento de aplicação
  /// </summary>
  public class LancamentoAplicacaoModel : BaseModel
  {
    /// <summary>
    /// Identificador da aplicação
    /// </summary>
    public int IdAplicacao { get; set; }

    /// <summary>
    /// Data
    /// </summary>
    public DateTime Data { get; set; }

    /// <summary>
    /// Valor
    /// </summary>
    public decimal Valor { get; set; }
  }
}
