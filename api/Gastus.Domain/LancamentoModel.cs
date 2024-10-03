using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastus.Domain
{
  /// <summary>
  /// Representa um item de Lançamento
  /// </summary>
  public class LancamentoModel : BaseModel
  {
    /// <summary>
    /// Data do lançamento
    /// </summary>
    public DateTime Data { get; set; }

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
}
