using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
  public class UserParams
  {
    private const int MaxPageSize = 50;
    public int PageNumber { get; set; } = 1;
    private int pageSize = 9;
    public int PageSize
    {
      get { return pageSize; }
      set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
    }
    public int UserId { get; set; }

    public string? CurrentUserName { get; set; }

    public int MinFtp { get; set; } = 200;
    public int MaxFtp { get; set; } = 1000;

    public string OrderBy { get; set; } = "Ftp";
  }
}