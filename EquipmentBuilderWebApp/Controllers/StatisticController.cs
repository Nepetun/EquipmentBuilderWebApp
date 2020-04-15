using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilder.API.Dtos;
using EquipmentBuilder.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Controllers
{
    [Route("api/[controller]")] //finalnie da api/auth -- cała nazwa do słowa Controller
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly IStatisticsRepository _repo;

        public StatisticController(IStatisticsRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous] //dzieki temu atrybutowi nie musimy wysyłać tokenu do serwera  , ActionName("GetSendInvitations")
        [HttpGet("CalculateStatistics")]
        public async Task<StatisticsDto> CalculateStatistics(EquipmentStatisticDto eq)
        {

            var statistics = await _repo.CalculateStats(eq);

            return statistics;
        }
    }
}
