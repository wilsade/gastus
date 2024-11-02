using Dapper;

using Gastus.Domain;

using System.Collections.Generic;

namespace Gastus.Core
{
  /// <summary>
  /// Repositório para orçamento
  /// </summary>
  public class OrcamentosRepository(string databaseFileName) : GastusBaseRepository(databaseFileName),
    IOrcamentosRepository
  {
    /// <summary>
    /// Adicionar um Orçamento
    /// </summary>
    /// <param name="insertModel">Modelo de inserção</param>
    /// <returns></returns>
    public List<OrcamentoModel> AddOrcamentos(OrcamentoInsertModel insertModel)
    {
      var connection = GetConnection(false);
      const string sql = @"
        INSERT INTO ORCAMENTO (Id, IdCategoria, IdSubCategoria, NumMes, Valor, Descricao)
        VALUES (@Id, @IdCategoria, @IdSubCategoria, @NumMes, @Valor, @Descricao)";

      var inseridos = new List<OrcamentoModel>();
      foreach (var numeroMes in insertModel.NumMeses)
      {
        var novoOrcamento = new OrcamentoModel(GetNextIdFromTabela(connection, "Orcamento"),
          insertModel.IdCategoria,
          insertModel.IdSubCategoria,
          numeroMes,
          insertModel.Valor,
          insertModel.Descricao);
        _ = connection.Execute(sql, novoOrcamento);
        inseridos.Add(novoOrcamento);
      }
      return inseridos;
    }

    /// <summary>
    /// Excluir um Orçamento
    /// </summary>
    /// <param name="id">Identificador</param>
    /// <returns>Número de registros afetados</returns>
    public int DeleteOrcamento(int id)
    {
      return DeleteById("Orcamento", id);
    }

    /// <summary>
    /// Editar um Orçamento
    /// </summary>
    /// <param name="model">Orçamento</param>
    /// <returns>Número de registgors afetados</returns>
    public int EditOrcamento(OrcamentoModel model)
    {
      const string sql = @"
        UPDATE ORCAMENTO
        SET IdCategoria = @IdCategoria,
          IdSubCategoria = @IdSubCategoria,
          NumMes = @NumMes,
          Valor = @Valor,
          Descricao = @Descricao
        WHERE Id = @Id";
      var conn = GetConnection(false);
      int rows = conn.Execute(sql, model);
      return rows;
    }

    /// <summary>
    /// Recuperar todos os Orçamento
    /// </summary>
    /// <returns>Todos os Orçamento</returns>
    public List<OrcamentoViewModel> GetAllOrcamentos()
    {
      var connection = GetConnection(false);
      const string sql = @"
SELECT L.*, C.Nome NomeCategoria, S.Nome NomeSubCategoria
FROM ORCAMENTO L
  JOIN CATEGORIA C
    ON L.IdCategoria = C.Id
  JOIN SUBCATEGORIA S
    ON L.IdCategoria = S.IdCategoria
    AND L.IdSubCategoria = S.Id
ORDER BY L.NumMes, NomeCategoria, NomeSubCategoria";
      var lista = connection.Query<OrcamentoModel>(sql);

      var agrupado = lista
            .GroupBy(o => new { o.NumMes })
            .Select(grupo => new OrcamentoViewModel
            {
              NumMes = grupo.Key.NumMes,
              Total = grupo.Sum(o => o.Valor),
              Items = [.. grupo]
            })
            .OrderBy(vm => vm.NumMes)
            .ToList();

      return agrupado;
    }

    /// <summary>
    /// Recuperar um Orçamento
    /// </summary>
    /// <param name="id">Identificador</param>
    /// <returns>Orçamento</returns>
    public OrcamentoModel GetOrcamento(int id)
    {
      throw new NotImplementedException();
    }
  }
}
