using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EquipmentBuilder.API.Context;
using EquipmentBuilder.API.Data;
using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EquipmentBuilder.API.Controllers
{
    [Route("api/[controller]")] //finalnie da api/auth -- cała nazwa do słowa Controller
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemsRepository _repo;
        //private readonly IConfiguration _config;

        public ItemsController(IItemsRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpGet("GetItems")] 
        public async Task<IEnumerable<ItemsDto>> GetItems()
        {
            var items = await _repo.GetAllItems();

            return items;
        }
    }
}
