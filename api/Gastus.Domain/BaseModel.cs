using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastus.Domain
{
  /// <summary>
  /// Representa um modelo básico de entidade do SGBD
  /// </summary>
  public abstract class BaseModel
  {
    /// <summary>
    /// Identificador do modelo
    /// </summary>
    public int Id { get; set; }
  }
}
