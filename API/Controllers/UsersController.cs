using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  // Not needed, but I'm leaving it here for reference.
  // These are called in the BaseApiController.cs file.
  // [ApiController] This attribute makes the class act as a controller.
  // [Route("/api/[controller]")] This attribute defines the route for the class.
  [Authorize] // This attribute requires the user to be logged in to access the class.
  public class UsersController : BaseApiController
  {
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    public UsersController(IUserRepository userRepository, IMapper mapper)
    {
      _mapper = mapper;
      _userRepository = userRepository;
    }

    [HttpGet]// This attribute allows anonymous users to access this method.
    public async Task<ActionResult<IEnumerable<RiderDto>>> GetUsers()
    {
      var users = await _userRepository.GetRidersAsync();
      return Ok(users);
    }



    // gets a user by id
    [HttpGet("{username}")]
    // Have to remove IEnumerable because not returning list. (Type Conversion)
    public async Task<ActionResult<RiderDto>> GetUser(string username)
    {
      return await _userRepository.GetRiderAsync(username);

    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(RiderUpdateDto riderUpdateDto)
    {
      //get the user from the database
      var riderName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      var rider = await _userRepository.GetUserByUsernameAsync(riderName);
      //update the user
      _mapper.Map(riderUpdateDto, rider);
      //save the user
      _userRepository.Update(rider);

      if (await _userRepository.SaveAllAsync())
      {
        return NoContent();
      }

      return BadRequest("Could not update user");
    }
  }
}