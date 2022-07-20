using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
  public class LogUserLastActive : IAsyncActionFilter
  {
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
      var resultContext = await next();

      if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

      var riderId = resultContext.HttpContext.User.GetUserId();
      var repository = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
      var user = await repository.GetUserByIdAsync(riderId);
      user.LastActive = DateTime.Now;
      await repository.SaveAllAsync();
    }
  }
}