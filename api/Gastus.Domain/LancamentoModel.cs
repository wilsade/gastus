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
    public LancamentoModel(int id, DateOnly data, string titulo, string comentario, int idCategoria, int idSubCategoria, int? idTipoTransacao, decimal valor)
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
    public DateOnly Data { get; set; }
  }
}
