using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using Route = API.Entities.Route;

namespace API.Helpers
{
  public class AutoMapProfiles : Profile
  {
    public AutoMapProfiles()
    {
      // CreateMap<Source, Destination>();
      CreateMap<AppUser, RiderDto>().ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
      CreateMap<Route, RouteDto>();
      CreateMap<RiderUpdateDto, AppUser>(); 
    }
  }
}