using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gastus.Domain
{
  /// <summary>
  /// Serviços para o repositório
  /// </summary>
  public interface ICategoriasRepository
  {
    /// <summary>
    /// Recuperar todas as categorias
    /// </summary>
    /// <returns>Todas as categorias</returns>
    List<CategoriaModel> GetAllCategorias();

    /// <summary>
    /// Adicionar uma categoria
    /// </summary>
    /// <param name="categoria">Categoria a ser adicionada</param>
    /// <returns>Nova categoria</returns>
    CategoriaModel AddCategoria(CategoriaInsertModel categoria);

    /// <summary>
    /// Excluir uma categoria
    /// </summary>
    /// <param name="id">Identificador da categoria a ser excluída</param>
    /// <returns>Número de linhas afetadas na exclusão</returns>
    int DeleteCategoria(int id);
  }
}
