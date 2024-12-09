using System.Globalization;

using Dapper;

using Gastus.Domain;

namespace Gastus.Core
{
  /// <summary>
  /// Repositório para os relatórios
  /// </summary>
  public class RelatoriosRepository(string databaseFileName, ILancamentosRepository lancamentosRepository) :
    GastusBaseRepository(databaseFileName), IRelatoriosRepository
  {
    private readonly ILancamentosRepository _lancamentosRepository = lancamentosRepository;

    /// <summary>
    /// Recuperar o total das aplicações
    /// </summary>
    /// <returns>Total aplicações</returns>
    public List<RelatTotalAplicacaoModel> GetTotalAplicacoes()
    {
      var connection = GetConnection(false);
      const string sql = @"
        SELECT 
            'Conta corrente' AS Nome, SUM(L.Valor) AS Valor, 0 AS Ordem
        FROM Lancamento L

        UNION

        SELECT A.Nome AS Nome, LA.Valor AS Valor, 1 AS Ordem
        FROM Aplicacao A
        JOIN 
            LancamentoAplicacao LA ON A.Id = LA.IdAplicacao
        WHERE 
            LA.Data = (SELECT MAX(LA2.Data)
                FROM LancamentoAplicacao LA2
                WHERE LA2.IdAplicacao = LA.IdAplicacao)
        ORDER BY  Ordem,  Nome;";
      var result = connection.Query<RelatTotalAplicacaoModel>(sql).ToList();
      return result;
    }

    /// <summary>
    /// Recuperar o relatório de lancamentos por categoria/mês
    /// </summary>
    /// <returns>Lançamentos por categoria/mês</returns>
    public List<RelatLancamentosPorCategoriaMesModel> GetLancamentosPorCategoriaMes()
    {
      List<LancamentoViewModel> lancamentos = _lancamentosRepository.GetLancamentos();
      var agrupadoPorMes = lancamentos.GroupBy(l => new
      {
        NumMes = l.Data.Month,
        NomeMes = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(l.Data.Month)),
      }).Select(grupo => new
      {
        Chave = grupo.Key,
        LancamentosValidos = grupo.Where(x => !x.IndicaReceita && x.SaiNoRelatorio).OrderBy(x => x.NomeCategoria).ThenBy(x => x.NomeSubCategoria).ToList(),
      }).ToList();

      var lst = new List<RelatLancamentosPorCategoriaMesModel>();
      foreach (var itemPorMes in agrupadoPorMes)
      {
        decimal total = itemPorMes.LancamentosValidos.Sum(l => l.Valor);
        var porCategoria = itemPorMes.LancamentosValidos.GroupBy(l => l.IdCategoria).Select(x => new RelatLancamentosDaCategoriaModel
        {
          Codigo = x.Key,
          Nome = x.First().NomeCategoria,
          Valor = x.Sum(l => l.Valor),
          Lancamentos = x.GroupBy(y => new { y.IdSubCategoria, y.NomeSubCategoria }).Select(y => new RelatTotalCategoriaModel
          {
            Codigo = y.Key.IdSubCategoria,
            Nome = y.Key.NomeSubCategoria,
            Valor = y.Sum(l => l.Valor)
          }).ToList()
        }).ToList();

        var obj = new RelatLancamentosPorCategoriaMesModel(itemPorMes.Chave.NumMes, itemPorMes.Chave.NomeMes, porCategoria);
        lst.Add(obj);
      }
      return lst;
    }
  }
}
