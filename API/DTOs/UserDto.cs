using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
  // Return this object on User Login or Register
  public class UserDto
  {
    public string UserName { get; set; }
    public string Token { get; set; }

    public string Name { get; set; }
  }
}