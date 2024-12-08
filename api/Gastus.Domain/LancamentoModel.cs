namespace Gastus.Domain
{
  /// <summary>
  /// Representa um item básico de Lançamento
  /// </summary>
  public abstract class LancamentoBaseModel
  {
    /// <summary>
    /// Título
    /// </summary>
    public string Titulo { get; set; }

    /// <summary>
    /// Comentário
    /// </summary>
    public string Comentario { get; set; }

    /// <summary>
    /// Identificador da categoria
    /// </summary>
    public int IdCategoria { get; set; }

    /// <summary>
    /// Identificador subcategoria
    /// </summary>
    public int IdSubCategoria { get; set; }

    /// <summary>
    /// Identificador do tipo de transação
    /// </summary>
    public int? IdTipoTransacao { get; set; }

    /// <summary>
    /// Valor
    /// </summary>
    public decimal Valor { get; set; }
  }

  /// <summary>
  /// Representa um item de Lançamento
  /// </summary>
  public class LancamentoInsertModel : LancamentoBaseModel
  {
    /// <summary>
    /// Data do lançamento
    /// </summary>
    public string Data { get; set; }
  }

  /// <summary>
  /// Representa um item de Lançamento
  /// </summary>
  public class LancamentoModel : LancamentoBaseModel
  {
    /// <summary>
    /// Inicialização da classe: <see cref="LancamentoModel"/>.
    /// </summary>
    public LancamentoModel()
    {

    }

    /// <summary>
    /// Inicialização da classe: <see cref="LancamentoModel"/>.
    /// </summary>
    /// <param name="id">Identificador do lançamento</param>
    /// <param name="data">Data do lançamento</param>
    /// <param name="titulo">Título</param>
    /// <param name="comentario">Comentário</param>
    /// <param name="idCategoria">Identificador da categoria</param>
    /// <param name="idSubCategoria">Identificador subcategoria</param>
    /// <param name="idTipoTransacao">Identificador do tipo de transação</param>
    /// <param name="valor">Valor</param>
    public LancamentoModel(int id, DateTime data, string titulo, string comentario, int idCategoria, int idSubCategoria, int? idTipoTransacao, decimal valor)
    {
      Id = id;
      Data = data;
      Titulo = titulo;
      Comentario = comentario;
      IdCategoria = idCategoria;
      IdSubCategoria = idSubCategoria;
      IdTipoTransacao = idTipoTransacao;
      Valor = valor;
    }

    /// <summary>
    /// Identificador do lançamento
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Data do lançamento
    /// </summary>
    public DateTime Data { get; set; }

    /// <summary>
    /// Retorna uma string representando esta instância
    /// </summary>
    /// <returns>string representando esta instância</returns>
    public override string ToString() => $"[{Data}] {Titulo}";
  }

  /// <summary>
  /// Representa um item de visão de Lançamento
  /// </summary>
  public class LancamentoViewModel : LancamentoModel
  {
    /// <summary>
    /// Nome da categoria
    /// </summary>
    public string NomeCategoria { get; set; }

    /// <summary>
    /// Nome da subcategoria
    /// </summary>
    public string NomeSubCategoria { get; set; }

    /// <summary>
    /// Nome do tipo de transação
    /// </summary>
    public string NomeTipoTransacao { get; set; }

    /// <summary>
    /// Indica se a categoria representa uma receita
    /// </summary>
    public bool IndicaReceita { get; set; }

    /// <summary>
    /// Indica se a categoria sai no relatório
    /// </summary>
    public bool SaiNoRelatorio { get; set; }
  }
}
