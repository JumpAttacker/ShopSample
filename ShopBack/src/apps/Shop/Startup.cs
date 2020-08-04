using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Persistence.Context;
using Shop.Extensions;
using Shop.Services;
using System;
using System.Reflection;
using System.IO;
using System.Linq;
using Microsoft.OpenApi.Models;

namespace Shop
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationContext>((provider, builder) =>
            {
                var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
                Console.WriteLine($"connection string: {connectionString}");
                builder.UseLoggerFactory(DbExtensions.GetLoggerFactory).UseNpgsql(
                    connectionString ?? throw new KeyNotFoundException("cant find connection string"));
                // "Host=localhost;Port=54320;Database=shopService;Username=postgres;Password=mysecretpassword");
            });
            services.AddControllers();

            services.AddCors();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    var authority = Environment.GetEnvironmentVariable("AUTH_Authority");
                    var audience = Environment.GetEnvironmentVariable("AUTH_Audience");

                    Console.WriteLine($"authority: {authority}");
                    Console.WriteLine($"audience: {audience}");
                    options.Authority = authority;
                    options.Audience = audience;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidIssuers = new[] {"http://localhost:5000", "http://identity_server4/"}
                    };
                });
#if DEBUG
            IdentityModelEventSource.ShowPII = true;
#endif
            // services.AddResponseCaching(options =>
            // {
            //     options.UseCaseSensitivePaths = true;
            //     options.MaximumBodySize = 1024;
            // });

            services.AddTransient<IShopService, ShopService>();
            services.AddMemoryCache();
            services.AddSwaggerGen(c =>
            {
                //get token for swagger 
                //http://localhost:5000/connect/token
                //with body client_id=interactive.confidential&client_secret=secret&grant_type=client_credentials
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Shop Api",
                    Description = "A simple example ASP.NET Core Web API",
                });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);

                c.AddSecurityDefinition("Bearer",
                    new OpenApiSecurityScheme
                    {
                        In = ParameterLocation.Header,
                        Description = "Please enter into field the word 'Bearer' following by space and JWT",
                        Name = "Authorization", Type = SecuritySchemeType.ApiKey
                    });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,

                        },
                        new List<string>()
                    }
                });
            });
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.InitializeDatabase();
            // app.UseResponseCaching();

            app.UseCors(builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowAnyHeader());

            app.UseStaticFiles();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => endpoints.MapDefaultControllerRoute());

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                // c.RoutePrefix = string.Empty;
            });
        }
    }
}