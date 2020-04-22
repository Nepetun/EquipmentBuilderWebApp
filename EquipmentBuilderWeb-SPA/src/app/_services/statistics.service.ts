import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStatisticEquipment } from '../models/IStatisticEquipment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, finalize } from 'rxjs/operators';
import { IEquipmentToGetStatistics } from '../models/IEquipmentToGetStatistics';
import { IHero } from '../models/IHero';
import { IHeroCalculateGold } from '../models/IHeroCalculateGold';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  baseUrl: any = environment.apiUrl + '/Statistic';
  public equipment: IEquipmentToGetStatistics;
  private statisticSubject = new BehaviorSubject<IStatisticEquipment>({
    hitPoints: 0,
    hitPointsRegen: 0,
    mana: 0,
    manaRegen: 0,
    range: 0,
    attackDamage: 0,
    attackSpeed: 0,
    armour: 0,
    magicResistance: 0,
    movementSpeed: 0,
    abillityPower: 0,
    cooldownReduction: 0,
    armourPenetration: 0,
    armourPenetrationProc: 0,
    magicPenetration: 0,
    magicPenetrationProc: 0,
    lifeSteal: 0,
    apLifeSteal: 0,
    tenacity: 0,
    criticalChance: 0,
    additionalPotionPower: 0,
    additionalHitPointsPerHit: 0,
    additionalGoldPerTenSec: 0,
    description: '',
    totalCost: 0,
  });

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadStatistics(equipment: IEquipmentToGetStatistics) {
    this.loadingSubject.next(true);

    this.getStatistics(equipment).pipe(
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((res) => {
      this.statisticSubject.next(res);
    });
  }

  getStatistics(equipment: IEquipmentToGetStatistics): Observable<IStatisticEquipment> {
    let statistics: IStatisticEquipment = {
      hitPoints: 0,
      hitPointsRegen: 0,
      mana: 0,
      manaRegen: 0,
      range: 0,
      attackDamage: 0,
      attackSpeed: 0,
      armour: 0,
      magicResistance: 0,
      movementSpeed: 0,
      abillityPower: 0,
      cooldownReduction: 0,
      armourPenetration: 0,
      armourPenetrationProc: 0,
      magicPenetration: 0,
      magicPenetrationProc: 0,
      lifeSteal: 0,
      apLifeSteal: 0,
      tenacity: 0,
      criticalChance: 0,
      additionalPotionPower: 0,
      additionalHitPointsPerHit: 0,
      additionalGoldPerTenSec: 0,
      description: '',
      totalCost: 0,
    };
    let params = new HttpParams();

    if (equipment) {
      params = params.append('heroLvl', equipment.heroLvl.toString());
      params = params.append('heroId', equipment.heroId.toString());
      params = params.append('firtItemId', equipment.firtItemId.toString());
      params = params.append('secondItemId', equipment.secondItemId.toString());
      params = params.append('thirdItemId', equipment.thirdItemId.toString());
      params = params.append('fourthItemId', equipment.fourthItemId.toString());
      params = params.append('fifthItemId', equipment.fifthItemId.toString());
      params = params.append('sixthItemId', equipment.sixthItemId.toString());
    }

    return this.http.get<IStatisticEquipment>(this.baseUrl + '/CalculateStatistics', {
      observe: 'response',
      params
    }).pipe(
      map((response) => {
        statistics = response.body;
        return statistics;
      }
    ));
  }

  getGold(hero: IHeroCalculateGold) {
    let gold: number;
    let params = new HttpParams();

    if (hero) {
      params = params.append('heroLvl', hero.heroLvl.toString());
      params = params.append('heroId', hero.heroId.toString());
    }

    return this.http.get<number>(this.baseUrl + '/CalculateGold', {
      observe: 'response',
      params
    }).pipe(
      map((response) => {
        gold = response.body;
        return gold;
      }
    ));
  }
}
