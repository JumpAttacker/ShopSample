using System;
using System.Collections.Generic;
using System.Linq;
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

        public static void InitializeDatabase(this IApplicationBuilder app)
        {
            Console.WriteLine("Start migration");
            try
            {
                using var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope();
                scope.ServiceProvider.GetRequiredService<ApplicationContext>().Database.Migrate();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            Console.WriteLine("End migration");


            try
            {
                using var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
                var any = context.Items.Any();
                if (!any)
                {
                    Console.WriteLine("start seeding");
                    var data = new List<Item>();
                    for (var i = 0; i < 100; i++)
                        data.Add(new Item
                        {
                            Name = $"Item #{i}",
                            Description = "some description for item #" + i,
                            Price = new Random(100).Next(10, 500)
                        });
                    context.Items.AddRange(data);
                    context.SaveChanges();
                    Console.WriteLine("end of seed");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}