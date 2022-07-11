using API.Extensions;

namespace API.Entities
{
  public class AppUser
  {
    public int Id { get; set; }
    public string? UserName { get; set; }

    public byte[]? PasswordHash { get; set; }
    public byte[]? PasswordSalt { get; set; }

    public DateTime DateOfBirth { get; set; }

    public string? Name { get; set; }

    public DateTime Created { get; set; } = DateTime.Now;

    public DateTime LastActive { get; set; } = DateTime.Now;

    public string? Gender { get; set; }

    public string? Email { get; set; }

    public string? City { get; set; }

    public string? Country { get; set; }

    public string? Bio { get; set; }

    public string? imgUrl { get; set; }

    public string? FTP { get; set; }

    public string? RideTypes { get; set; }

    public ICollection<Route> Routes { get; set; }

    public int GetAge()
    {
      return DateOfBirth.CalculateAge();
    }
  }
}