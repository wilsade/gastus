﻿using Gastus.Domain;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para Categorias
  /// </summary>
  /// <remarks>
  /// Inicialização da classe: <see cref="CategoriasController"/>.
  /// </remarks>
  /// <param name="repository">Repositório</param>
  [ApiController]
  [Route("api/[controller]")]
  public class CategoriasController(ICadastrosRepository repository) : GastusBaseCadastrosController(repository)
  {
    /// <summary>
    /// Recuperar todas as categorias cadastradas
    /// </summary>
    /// <param name="loadSubs">true para carregar as subcategorias</param>
    /// <param name="orderByName">true para ordenar os registros por nome</param>
    /// <returns>Lista de categorias</returns>
    [HttpGet()]
    public IActionResult GetAllCategorias(bool loadSubs, bool orderByName = false)
    {
      try
      {
        List<CategoriaModel> lista = _repository.GetAllCategorias(loadSubs, orderByName);
        return Ok(lista);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Recuperar uma categoria
    /// </summary>
    /// <param name="id">Identificador da categoria</param>
    /// <returns>Categoria</returns>
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      try
      {
        CategoriaModel model = _repository.GetCategoria(id);
        if (model == null)
          return NotFound($"Categoria com ID={id} não encontrado.");

        return Ok(model);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Inserir uma categoria
    /// </summary>
    /// <param name="categoria">Categoria</param>
    /// <returns>Categoria inserida</returns>
    [HttpPost()]
    public IActionResult AddCategoria([FromBody] CategoriaInsertModel categoria)
    {
      try
      {
        CategoriaModel model = _repository.AddCategoria(categoria);
        return Ok(model);
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Excluir uma categoria
    /// </summary>
    /// <param name="id">Identificador da categoria</param>
    /// <returns>NotFound se não houve exclusão; OK em caso de sucesso</returns>
    [HttpDelete("{id}")]
    public IActionResult DeleteCategoria(int id)
    {
      try
      {
        int rowsAffected = _repository.DeleteCategoria(id);
        if (rowsAffected > 0)
          return Ok(rowsAffected);
        return NotFound();
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }

    /// <summary>
    /// Editar uma categoria
    /// </summary>
    /// <param name="model">Dados da modificação</param>
    /// <returns>NoContent se não houve alteração; OK em caso de sucesso</returns>
    [HttpPut()]
    public IActionResult EditCategoria([FromBody] CategoriaEditModel model)
    {
      try
      {
        int rowsAffected = _repository.EditCategoria(model);
        if (rowsAffected > 0)
          return Ok(rowsAffected);
        return NotFound();
      }
      catch (Exception ex)
      {
        return ReturnBadRequestException(ex);
      }
    }
  }
}
