using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Route = API.Entities.Route;

namespace API.Helpers
{
  public class AutoMapProfiles : Profile
  {
    public AutoMapProfiles()
    {
      // CreateMap<Source, Destination>();
      CreateMap<AppUser, RiderDto>();
      CreateMap<Route, RouteDto>();

    }
  }
}