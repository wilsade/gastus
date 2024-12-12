using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    /// Previsto
    /// </summary>
    public List<RelatTotalCategoriaModel> Previsto { get; set; } = [];

    /// <summary>
    /// Realizado
    /// </summary>
    public List<RelatTotalCategoriaModel> Realizado { get; set; } = [];

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
    public override string ToString() => $"{NomeMes} [{TotalPrevisto}]";
  }
}
