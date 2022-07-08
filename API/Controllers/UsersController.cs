using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController] // This attribute makes the class act as a controller.
    [Route("/api/[controller]")] // This attribute defines the route for the class.
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        // gets all users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() => await _context.Users.ToListAsync();

        // gets a user by id
        [HttpGet("{id}")]
        // Have to remove IEnumerable because not returning list. (Type Conversion)
        public async Task<ActionResult<AppUser>> GetUserById(int id) => await _context.Users.FindAsync(id);

    }
}