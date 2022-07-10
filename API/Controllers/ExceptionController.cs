using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ExceptionController : BaseApiController
  {
    private readonly DataContext _context;
    public ExceptionController(DataContext context)
    {
      _context = context;
    }

    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetSecret()
    {
      return "secret text";
    }

    [HttpGet("not-found")]
    public ActionResult<AppUser> GetNotFound()
    {
      var testParam = _context.Users.Find(-1);
      if (testParam == null)
      {
        return NotFound();
      }
      return Ok(testParam);
    }

    [HttpGet("server-error")]
    public ActionResult<string> GetServerError()
    {
      var testParam = _context.Users.Find(-1);
      var test = testParam.ToString();
      return Ok(test);
    }

    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
      return BadRequest("bad request");
    }

  }
}