using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Persistence.Context;

namespace Shop.Extensions
{
    public static class DbExtensions
    {
        public static readonly ILoggerFactory GetLoggerFactory = LoggerFactory.Create(builder =>
        {
            builder.AddConsole();
        });

        public static void InitializeDatabase(this IApplicationBuilder app)
        {
            // try
            // {
            //     var client = new HttpClient();
            //     var result = await client.GetStringAsync("http://identity_server4/.well-known/openid-configuration");
            //     Console.WriteLine("OPEN ID: " + result);
            // }
            // catch (Exception e)
            // {
            //     Console.WriteLine(e);
            // }
            //
            // try
            // {
            //     var client = new HttpClient();
            //     var result = await client.GetStringAsync("http://identity_server/.well-known/openid-configuration");
            //     Console.WriteLine("OPEN ID: " + result);
            // }
            // catch (Exception e)
            // {
            //     Console.WriteLine(e);
            // }
            Console.WriteLine("Starting migration");
            try
            {
                using var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope();
                scope.ServiceProvider.GetRequiredService<ApplicationContext>().Database.Migrate();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Starting migration");
        }
    }
}