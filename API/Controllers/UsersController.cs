using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // Not needed, but I'm leaving it here for reference.
    // These are called in the BaseApiController.cs file.
    // [ApiController] This attribute makes the class act as a controller.
    // [Route("/api/[controller]")] This attribute defines the route for the class.
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        // gets all users
        [HttpGet]
        [AllowAnonymous] // This attribute allows anonymous users to access this method.
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() => await _context.Users.ToListAsync();


        [Authorize] // This attribute makes the method only accessible to users who are logged in.
        // gets a user by id
        [HttpGet("{id}")]
        // Have to remove IEnumerable because not returning list. (Type Conversion)
        public async Task<ActionResult<AppUser>> GetUserById(int id) => await _context.Users.FindAsync(id);

    }
}