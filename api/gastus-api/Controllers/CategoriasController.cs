using Microsoft.AspNetCore.Mvc;


using System.Data.SQLite;

namespace Gastus.Api.Controllers
{
  /// <summary>
  /// Controller para Categorias
  /// </summary>
  [ApiController]
  [Route("[controller]")]
  public class CategoriasController : GastusBaseController
  {
    const string DATABASE_FILE_NAME = @"Data Source=gastus.db;Version=3;";

    /// <summary>
    /// Recuperar todas as categorias cadastradas
    /// </summary>
    /// <returns>All categorias</returns>
    [HttpGet()]
    public IActionResult GetAllCategorias()
    {
      try
      {
        // Estabelecer a conexão com o banco de dados
        using (var connection = new SQLiteConnection(DATABASE_FILE_NAME))
        {
          connection.Open();

          // Executar a consulta para obter as categorias
          var query = "SELECT id, nome FROM Categoria";
          using (var command = new SQLiteCommand(query, connection))
          {
            var categorias = new List<object>();

            using (var reader = command.ExecuteReader())
            {
              while (reader.Read())
              {
                var categoria = new
                {
                  id = reader.GetInt32(0),
                  nome = reader.GetString(1)
                };

                categorias.Add(categoria);
              }
            }

            return Ok(categorias);
          }
        }

        var obj = new[]
        {
          new
          {
            id = 1,
            nome = "Alimentação",
            filhas = new[]
            {
              new { idCategoria = 1, id = 1, nome = "Doces" },
              new { idCategoria = 1, id = 2, nome = "Lanchonete" },
              new { idCategoria = 1, id = 3, nome = "Padaria" },
              new { idCategoria = 1, id = 4, nome = "Restaurante" },
              new { idCategoria = 1, id = 5, nome = "Supermercado" },
              new { idCategoria = 1, id = 6, nome = "App celular" },
              new { idCategoria = 1, id = 7, nome = "Outros" },
            }
          },
          new
          {
            id = 2,
            nome = "Lazer",
            filhas = new[]
            {
              new { idCategoria = 2, id = 1, nome = "Cinema" },
              new { idCategoria = 2, id = 2, nome = "Dança" },
              new { idCategoria = 2, id = 3, nome = "Jogos" },
              new { idCategoria = 2, id = 4, nome = "Festas" },
              new { idCategoria = 2, id = 5, nome = "Bar" },
              new { idCategoria = 2, id = 6, nome = "Viagem" },
              new { idCategoria = 2, id = 7, nome = "Outros" },
            }
          }
        };
        return Ok(obj);
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }

    [HttpPost()]
    public IActionResult AddCategoria([FromBody] CategoriaModel categoria)
    {
      try
      {
        // Estabelecer a conexão com o banco de dados
        using (var connection = new SQLiteConnection(DATABASE_FILE_NAME))
        {
          connection.Open();

          int idCategoria = 1; // categoria["id"].ToObject<int>();
          string nomeCategoria = "Alimentção"; // categoria["nome"].ToString();

          // Executar a consulta para obter as categorias
          var query = "INSERT INTO Categoria (id, nome) VALUES (@id, @nome)";
          using (var command = new SQLiteCommand(query, connection))
          {
            command.Parameters.AddWithValue("@id", categoria.Id);
            command.Parameters.AddWithValue("@nome", categoria.Nome);
            command.ExecuteNonQuery();
          }

          return Ok();
        }
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }
  }
}
