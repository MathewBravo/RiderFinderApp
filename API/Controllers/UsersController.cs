using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Identity;

using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Route = API.Entities.Route;
using API.Helpers;
using API.Extensions;

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
    public async Task<ActionResult<IEnumerable<RiderDto>>> GetUsers([FromQuery] UserParams userParams)
    {
      var rider = await _userRepository.GetUserByUsernameAsync(User.FindFirst(ClaimTypes.Name)?.Value);
      userParams.CurrentUserName = rider.UserName;
      Console.Write("hello");
      var users = await _userRepository.GetRidersAsync(userParams);
      Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
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
      var riderName = User.FindFirst(ClaimTypes.Name)?.Value;
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

    [HttpPut("add-route")]
    public async Task<ActionResult> AddRoute(RouteDto routeDto)
    {
      var riderName = User.FindFirst(ClaimTypes.Name)?.Value;
      var rider = await _userRepository.GetUserByUsernameAsync(riderName);
      var _route = _mapper.Map<Route>(routeDto);
      _route.AppUser = rider;
      _route.AppUserId = rider.Id;
      _userRepository.Update(rider);
      rider.Routes.Add(_route);
      if (await _userRepository.SaveAllAsync())
      {
        return NoContent();
      }
      return BadRequest("Could not add route");
    }


    [HttpDelete("delete-route/{routeId}")]
    public async Task<ActionResult> DeleteRoute(int routeId)
    {
      var riderName = User.FindFirst(ClaimTypes.Name)?.Value;
      var rider = await _userRepository.GetUserByUsernameAsync(riderName);
      var route = rider.Routes.FirstOrDefault(r => r.Id == routeId);
      Console.Write("Hello");
      if (route == null)
      {
        return NotFound();
      }
      rider.Routes.Remove(route);
      _userRepository.Update(rider);
      if (await _userRepository.SaveAllAsync())
      {
        return Ok();
      }
      return BadRequest("Could not delete route");

    }
  }
}