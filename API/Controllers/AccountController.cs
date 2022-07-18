using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class AccountController : BaseApiController
  {
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;
    public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
    {
      _mapper = mapper;
      _tokenService = tokenService;
      _context = context;
    }


    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
      if (await CheckUserExists(registerDto.UserName)) return BadRequest("Username Already In Use");

      var user = _mapper.Map<AppUser>(registerDto);

      using var hmac = new HMACSHA512();

      user.UserName = registerDto.UserName.ToLower();
      user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
      user.PasswordSalt = hmac.Key;

      _context.Users.Add(user);
      await _context.SaveChangesAsync();

      return new UserDto
      {
        UserName = user.UserName,
        Token = _tokenService.CreateToken(user),
        Name = user.Name,

      };
    }


    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      // get user from db
      var user = await _context.Users.SingleOrDefaultAsync(exisitingUser => exisitingUser.UserName == loginDto.UserName);
      if (user == null) return Unauthorized("Invalid Username Provided");

      // Use overload to send byte key to give us the hash we initially created for PW
      using var hmac = new HMACSHA512(user.PasswordSalt);

      var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

      for (int i = 0; i < computedHash.Length; i++)
      {
        if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password Provided");
      }

      return new UserDto
      {
        UserName = user.UserName,
        Token = _tokenService.CreateToken(user),
        Name = user.Name,
      };
    }

    private async Task<bool> CheckUserExists(string username)
    {
      return await _context.Users.AnyAsync(existingUser => existingUser.UserName == username.ToLower());
    }
  }
}
