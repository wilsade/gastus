using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastus.Domain
{
  /// <summary>
  /// Representa um item de SubCategoria
  /// </summary>
  public class SubCategoriaModel : BaseModel
  {
    /// <summary>
    /// Identificador da categoria
    /// </summary>
    public int IdCategoria { get; set; }

    /// <summary>
    /// Nome da subcategoria
    /// </summary>
    public string Nome { get; set; }

    /// <summary>
    /// Retorna uma string representando esta instância
    /// </summary>
    /// <returns>string representando esta instância</returns>
    public override string ToString() => Nome;
  }
}
