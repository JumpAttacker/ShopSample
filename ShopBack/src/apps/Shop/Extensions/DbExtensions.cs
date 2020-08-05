using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Model;
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

        public static async Task InitializeDatabase(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();

            try
            {
                Console.WriteLine("Start migration");
                await scope.ServiceProvider.GetRequiredService<ApplicationContext>().Database.MigrateAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            finally
            {
                Console.WriteLine("End migration");
            }

            try
            {
                var any = context.Items.Any();
                if (!any)
                {
                    Console.WriteLine("Start seeding");
                    var data = new List<Item>();
                    for (var i = 0; i < 100; i++)
                        data.Add(new Item
                        {
                            Name = $"Item #{i}",
                            Description = "some description for item #" + i,
                            Price = new Random(100).Next(10, 500)
                        });
                    await context.Items.AddRangeAsync(data);
                    await context.SaveChangesAsync();
                    Console.WriteLine("End of seed");
                }
                else
                {
                    Console.WriteLine("There are no reasons to seed in db");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error in seeding");
                Console.WriteLine(e);
            }
        }
    }
}