using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RiderDto
    {
    public int Id { get; set; }
    public string? UserName { get; set; }

    public int Age { get; set; }

    public string? Name { get; set; }

    public DateTime Created { get; set; }

    public DateTime LastActive { get; set; }

    public string? Gender { get; set; }

    public string? Email { get; set; }

    public string? City { get; set; }

    public string? Country { get; set; }

    public string? Bio { get; set; }

    public string? imgUrl { get; set; }

    public string? FTP { get; set; }

    public string? RideTypes { get; set; }

    public ICollection<RouteDto> Routes { get; set; }

    }
}