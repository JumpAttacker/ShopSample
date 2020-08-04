using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Model;
using Shop.DTOs;

namespace Shop.Services
{
    public interface IShopService
    {
        Task<List<Item>> GetItems();
        Task<CountedData<Item>> GetItems(PaginationModel paginationSettings);
        Task<Item> GetItemById(int id);
        Task<Item> UpdateItem(Item item);
        Task<Item> CreateItem(ItemDtoCreate dtoCreate);
        Task<Item> DeleteItem(int id);
    }
}