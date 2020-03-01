using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EquipmentBuilder.API.Context;
using EquipmentBuilder.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EquipmentBuilder.API.Controllers
{
    [Authorize] //wymaga na klasie otrzymania tokenu- chyba, ze metoda ma atrybut mowiacy inaczej
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase //controller base nie wprowadza viewsow- te robimy w angularze
    {
        
        private readonly DataContext _context;

        public ValuesController(DataContext context)
        {
            _context = context;
        }


        // GET api/values
        //[HttpGet]
        //public ActionResult<IEnumerable<string>> Get()
        //{
        //    return new string[] { "value1", "value2" };            
        //}

        [HttpGet]
        public async Task<IActionResult> GetValues() ///async zeby mozna bylo wiele getow w 1 momencie odbierac
        {
            var values = await _context.Users.ToListAsync(); //await mowi zeby poczekac na odpowiedz z bazy

            return Ok(values);
        }

        // GET api/values/5
        //[HttpGet("{id}")]
        //public ActionResult<string> Get(int id)
        //{
        //    return "value";
        //}
        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        
    }
}
