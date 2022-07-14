using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
  public class RiderUpdateDto
  {
    public string Bio { get; set; }
    public string FTP { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
  }
}