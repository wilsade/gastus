using System.Data.SQLite;

using Microsoft.AspNetCore.Mvc;

namespace Gastus.Api.Controllers
{
  public abstract class GastusBaseController : ControllerBase
  {
    protected IActionResult ReturnBadRequestException(Exception ex)
    {
      if (ex is SQLiteException sqlEx)
        return BadRequest(new { error = sqlEx.Message });
      else
        return StatusCode(500, new
        {
          error = "An error occurred while processing your request.",
          message = ex.InnerException?.Message ?? ex.Message
        });

    }
  }
}
