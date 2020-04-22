using EquipmentBuilder.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentBuilder.API.Data.Interfaces
{
    public interface IStatisticsRepository
    { 
        Task<StatisticsDto> CalculateStats(EquipmentStatisticDto eqDto);
        Task<int> CalculateGold(HeroPickedDto hero);
    }
}
