namespace API.DTOs
{
  public class RouteDto
  {
    public int Id { get; set; }
    public string Url { get; set; }
    public string Name { get; set; }
    public bool Favorited { get; set; } = false;
  }
}