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
    const string DATABASE_FILE_NAME = @"Data Source=C:\_Wilsade\Projetos\git\gastus\gastus.db;Version=3;";

    [HttpGet("bla")]
    public IActionResult GetBla()
    {
      return Ok("bla");
    }

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
        return ReturnBadRequestException(ex);
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
        return ReturnBadRequestException(ex);
      }
    }

    [HttpDelete("id")]
    public async Task<IActionResult> DeleteCategoria(int id)
    {
      using (var connection = new SQLiteConnection(DATABASE_FILE_NAME))
      {
        await connection.OpenAsync();

        // Comando SQL para excluir a categoria pelo ID
        var commandText = "DELETE FROM Categoria WHERE Id = @Id";
        using (var command = new SQLiteCommand(commandText, connection))
        {
          command.Parameters.AddWithValue("@Id", id);

          // Executa o comando de exclusão
          int affectedRows = await command.ExecuteNonQueryAsync();

          // Se nenhuma linha foi afetada, retorna 404
          if (affectedRows == 0)
          {
            return NotFound();
          }
        }
      }

      // Retorna 204 No Content em caso de sucesso
      return NoContent();
    }
  }
}
