using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class UserRepository : IUserRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public UserRepository(DataContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }


    public async Task<AppUser> GetUserByIdAsync(int id)
    {
      return await _context.Users.FindAsync(id);
    }

    public async Task<AppUser> GetUserByUsernameAsync(string username)
    {
      return await _context.Users.Include(route => route.Routes).SingleOrDefaultAsync(user => user.UserName == username);
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
      return await _context.Users.Include(route => route.Routes).ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
      return await _context.SaveChangesAsync() > 0; // Returns true if at least one row was affected.
    }

    public void Update(AppUser user)
    {
      _context.Entry(user).State = EntityState.Modified;
    }
    public async Task<RiderDto> GetRiderAsync(string username)
    {
      return await _context.Users.Where(user => user.UserName == username)
        .ProjectTo<RiderDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
    }

    public async Task<PagedList<RiderDto>> GetRidersAsync(UserParams userParams)
    {
      var query = _context.Users.AsQueryable();

      query = query.Where(user => user.UserName != userParams.CurrentUserName);
      var MinFtp = userParams.MinFtp;
      var MaxFtp = userParams.MaxFtp;

      query = query.Where(user => user.FTP >= MinFtp && user.FTP <= MaxFtp);

      query = userParams.OrderBy switch
      {
        "FtpD" => query.OrderByDescending(user => user.FTP),
        "FtpA" => query.OrderBy(user => user.FTP),
        _ => query.Where(user => user.UserName != userParams.CurrentUserName),
      };

      return await PagedList<RiderDto>.CreateAsync(query.ProjectTo<RiderDto>(_mapper.ConfigurationProvider)
          .AsNoTracking(), userParams.PageNumber, userParams.PageSize);
    }

    public Task GetUserByUsernameAsync(object value)
    {
      throw new NotImplementedException();
    }
  }
}