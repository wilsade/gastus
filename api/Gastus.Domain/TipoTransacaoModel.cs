namespace Gastus.Domain
{
  /// <summary>
  /// Representa um item de Tipo de transação
  /// </summary>
  public class TipoTransacaoModel : BaseModel
  {
    /// <summary>
    /// Inicialização da classe: <see cref="TipoTransacaoModel"/>.
    /// </summary>
    public TipoTransacaoModel()
    {

    }

    /// <summary>
    /// Inicialização da classe: <see cref="TipoTransacaoModel"/>.
    /// </summary>
    /// <param name="id">Identificador</param>
    /// <param name="nome">Nome</param>
    public TipoTransacaoModel(int id, string nome)
    {
      Id = id;
      Nome = nome;
    }

    /// <summary>
    /// Nome
    /// </summary>
    public string Nome { get; set; }

    /// <summary>
    /// Retorna uma string representando esta instância
    /// </summary>
    /// <returns>string representando esta instância</returns>
    public override string ToString() => $"[Id={Id}] {Nome}";
  }
}
