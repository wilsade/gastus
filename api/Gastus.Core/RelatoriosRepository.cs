using Dapper;

using Gastus.Domain;

namespace Gastus.Core
{
  /// <summary>
  /// Repositório para os relatórios
  /// </summary>
  public class RelatoriosRepository(string databaseFileName) : GastusBaseRepository(databaseFileName), IRelatoriosRepository
  {
    /// <summary>
    /// Recuperar o total das aplicações
    /// </summary>
    /// <returns>Total aplicações</returns>
    public List<TotalAplicacaoModel> GetTotalAplicacoes()
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
      var result = connection.Query<TotalAplicacaoModel>(sql).ToList();
      return result;
    }
  }
}
