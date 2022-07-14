using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{

  [Table("Routes")]
  public class Route
  {
    public int Id { get; set; }
    public string? Url { get; set; }

    public bool Favorited { get; set; }

    public string? Name { get; set; }

    public AppUser AppUser { get; set; }

    public int AppUserId { get; set; }

  }
}