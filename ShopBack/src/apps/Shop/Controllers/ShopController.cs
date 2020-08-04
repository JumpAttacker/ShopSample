using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shop.DTOs;
using Shop.Services;

namespace Shop.Controllers
{
    /// <summary>
    /// Shop controller
    /// </summary>
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class ShopController : ControllerBase
    {
        private readonly IShopService _shopService;
        private readonly ILogger<ShopController> _logger;

        public ShopController(ILogger<ShopController> logger, IShopService shopService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _shopService = shopService;
        }
        
        /// <summary>
        /// Получить все итемы
        /// </summary>
        /// <returns>Возвращает все итемы</returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _logger.LogDebug($"Method {nameof(Get)} ");
            var data = await _shopService.GetItems();
            return Ok(data);
        }
        
        [HttpGet("{Page:int}/{PerPage:int}")]
        public async Task<IActionResult> GetWithPagination([FromRoute] PaginationModel paginationSettings)
        {
            _logger.LogDebug($"Method {nameof(Get)} ");
            var data = await _shopService.GetItems(paginationSettings);
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            _logger.LogDebug($"Method {nameof(GetById)} with id {id}");
            var response = await _shopService.GetItemById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ItemDtoCreate dtoCreate)
        {
            _logger.LogDebug($"Method {nameof(Create)}");
            var response = await _shopService.CreateItem(dtoCreate);
            return Ok(response);
        }

        [HttpPut]
        [ProducesResponseType(typeof(Item), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Exception), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(Item item)
        {
            _logger.LogDebug($"Method {nameof(Update)}");
            var response = await _shopService.UpdateItem(item);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(Item), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Exception), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            _logger.LogDebug($"Method {nameof(Delete)}");
            var response = await _shopService.DeleteItem(id);
            return Ok(response);
        }
    }
}