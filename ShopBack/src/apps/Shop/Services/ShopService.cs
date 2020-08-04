using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Persistence.Context;
using Shop.DTOs;
using Shop.Extensions;

namespace Shop.Services
{
    public class ShopService : IShopService
    {
        private ApplicationContext Context { get; }
        private ILogger<ShopService> Logger { get; }
        private IMemoryCache MemoryCache { get; }

        public ShopService(ApplicationContext context, ILogger<ShopService> logger, IMemoryCache memoryCache)
        {
            Context = context;
            Logger = logger;
            MemoryCache = memoryCache;
        }

        public async Task<List<Item>> GetItems()
        {
            if (MemoryCache.TryGetValue("items", out List<Item> items)) return items;
            items = await Context.Items.OrderBy(x => x.Id).ToListAsync();
            if (items != null)
            {
                MemoryCache.Set("items", items,
                    new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(5)));
            }

            return items;
        }

        public async Task<CountedData<Item>> GetItems(PaginationModel paginationSettings)
        {
            var totalItems = await Context.Items.CountAsync();
            var items = await Context.Items.OrderBy(x => x.Id).Page(paginationSettings.Page, paginationSettings.PerPage)
                .ToListAsync();
            return new CountedData<Item>()
            {
                Data = items, Page = paginationSettings.Page, PageSize = paginationSettings.PerPage, Total = totalItems
            };
        }

        public async Task<Item> GetItemById(int id)
        {
            if (MemoryCache.TryGetValue(id, out Item item)) return item;
            item = await Context.Items.FirstOrDefaultAsync(p => p.Id == id);
            if (item != null)
            {
                MemoryCache.Set(item.Id, item,
                    new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(5)));
            }
            else
            {
                throw new KeyNotFoundException("cant find item with id: " + id);
            }

            return item;
        }

        public async Task<Item> UpdateItem(Item item)
        {
            await using var transaction = await Context.Database.BeginTransactionAsync();
            var itemInDb = await Context.Items.FirstOrDefaultAsync(x => x.Id == item.Id);
            if (itemInDb == null)
                throw new KeyNotFoundException("cant find item with id: " + item.Id);

            itemInDb.Description = item.Description;
            itemInDb.Name = item.Name;
            itemInDb.Price = item.Price;
            await Context.SaveChangesAsync();
            MemoryCache.Remove("items");
            MemoryCache.Remove(itemInDb.Id);
            await transaction.CommitAsync();
            return itemInDb;
        }

        public async Task<Item> CreateItem(ItemDtoCreate dtoCreate)
        {
            await using var transaction = await Context.Database.BeginTransactionAsync();
            var item = new Item
            {
                Name = dtoCreate.Name,
                Description = dtoCreate.Description,
                Price = dtoCreate.Price
            };
            await Context.Items.AddAsync(item);
            var doneCount = await Context.SaveChangesAsync();
            if (doneCount > 0)
            {
                MemoryCache.Set(item.Id, item, new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
                MemoryCache.Remove("items");
            }

            await transaction.CommitAsync();
            return item;
        }

        public async Task<Item> DeleteItem(int id)
        {
            await using var transaction = await Context.Database.BeginTransactionAsync();
            var itemInDb = await Context.Items.FirstOrDefaultAsync(x => x.Id == id);
            if (itemInDb == null)
                throw new KeyNotFoundException("cant find item with selected id " + id);

            Context.Items.Remove(itemInDb);
            await Context.SaveChangesAsync();
            MemoryCache.Remove("items");
            await transaction.CommitAsync();
            return itemInDb;
        }
    }
}