using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Gastus.Domain;

namespace Gastus.Core
{
  /// <summary>
  /// Repositório para os relatórios
  /// </summary>
  public class RelatoriosRepository(string databaseFileName) : GastusBaseRepository(databaseFileName), IRelatoriosRepository
  {
  }
}
