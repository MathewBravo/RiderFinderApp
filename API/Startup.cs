using System.Text;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using API.Extensions;
using API.Middleware;

namespace API
{
  public class Startup
  {

    private readonly IConfiguration _configuration;
    public Startup(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddApplicationsServices(_configuration);

      services.AddControllers();

      services.AddCors();

      services.AddIdentityServices(_configuration);

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
      });

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseMiddleware<ExceptionMiddleware>();

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200")); // allow any origin to access the api

      app.UseAuthentication(); // this is important to call before app.UseAuthorization()

      app.UseAuthorization(); // this is important to call before app.UseEndpoints()

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
