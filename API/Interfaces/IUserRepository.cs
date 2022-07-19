using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
  public interface IUserRepository
  {
    void Update(AppUser user);

    Task<bool> SaveAllAsync();
    // Add ASync keyword to advise that these methods should be implemeneted as asynchronous.   
    Task<IEnumerable<AppUser>> GetUsersAsync();

    Task<AppUser> GetUserByIdAsync(int id);

    Task<AppUser> GetUserByUsernameAsync(string username);

    Task<PagedList<RiderDto>> GetRidersAsync(UserParams userParams);

    Task<RiderDto> GetRiderAsync(string username);
    Task GetUserByUsernameAsync(object value);
  }
}