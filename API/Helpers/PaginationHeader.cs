using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
  public class PaginationHeader
  {
    public PaginationHeader(int currentPage, int itemsPerPage, int totalItems, int pageCount)
    {
      CurrentPage = currentPage;
      ItemsPerPage = itemsPerPage;
      TotalItems = totalItems;
      PageCount = pageCount;
    }

    public int CurrentPage { get; set; }
    public int ItemsPerPage { get; set; }
    public int TotalItems { get; set; }
    public int PageCount { get; set; }
  }
}