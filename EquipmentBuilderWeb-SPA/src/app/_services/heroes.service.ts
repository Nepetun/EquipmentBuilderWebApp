import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, finalize } from 'rxjs/operators';
import { IHero } from '../models/IHero';
import { Pagination, PaginatedResult } from '../models/pagination';
import { IHeroesManagementFilter } from '../models/Filters/IHeroesManagementFilter';
import { IHeroesManagement } from '../models/IHeroesManagement';
import { IHeroCreator } from '../models/IHeroCreator';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  baseUrl: any = environment.apiUrl + '/Heroes';
  private heroesSubject = new BehaviorSubject<IHero[]>([
    {
      id: 1,
      heroName: '',
    },
  ]);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private paginationSubject = new BehaviorSubject<Pagination>({
    currentPage: 1,
    itemsPerPage: 100,
    totalItems: 100,
    totalPages: 10,
  });
  public pagination$ = this.paginationSubject.asObservable();

  private heroesToManagementSubject = new BehaviorSubject<IHeroesManagement[]>([
    {
      id: 1,
      heroName: '',
    },
  ]);

  public heroesToManage$ = this.heroesToManagementSubject.asObservable();

  private selectedHeroId = new BehaviorSubject<number>(-1);
  public selectedHeroId$ = this.selectedHeroId.asObservable();

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<IHero[]> {
    let heroes: IHero[] = new Array<IHero>();
    return this.http
      .get<IHero[]>(this.baseUrl + '/GetAllHeroes', {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          heroes = response.body;
          return heroes;
        })
      );
  }

  loadHeroesToManagement(
    pagination: Pagination,
    filters: IHeroesManagementFilter
  ) {
    this.loadingSubject.next(true);
    this.getHeroesToManagement(
      pagination.currentPage,
      pagination.itemsPerPage,
      filters
    )
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe((res) => {
        this.heroesToManagementSubject.next(res.result);
        this.paginationSubject.next(res.pagination);
      });
  }

  getHeroesToManagement(
    page?,
    itemsPerPage?,
    filters?
  ): Observable<PaginatedResult<IHeroesManagement[]>> {
    let heroesToManage: PaginatedResult<IHero[]> = new PaginatedResult<
      IHero[]
    >();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (filters) {
      if (filters.heroNameLike) {
        params = params.append('heroNameLike', filters.heroNameLike);
      } else {
        params = params.append('heroNameLike', '');
      }
    }

    return this.http
      .get<IHero[]>(this.baseUrl + '/GetHeroesToManagement', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          heroesToManage.result = response.body;
          if (response.headers.get('Pagination') != null) {
            heroesToManage.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return heroesToManage;
        })
      );
  }

  addHero(heroAdded: IHeroCreator) {
    let heroCreated: IHeroCreator = heroAdded;

    return this.http
      .post<IHeroCreator>(this.baseUrl + '/AddHeroes', {
        id: heroCreated.id,
        heroName: heroCreated.heroName,
        hitPoints: heroCreated.hitPoints,
        hitPointsRegen: heroCreated.hitPointsRegen,
        mana: heroCreated.mana,
        manaRegen: heroCreated.manaRegen,
        range: heroCreated.range,
        attackDamage: heroCreated.attackDamage,
        attackSpeed: heroCreated.attackSpeed,
        armour: heroCreated.armour,
        magicResistance: heroCreated.magicResistance,
        movementSpeed: heroCreated.movementSpeed,
        abilityPower: heroCreated.abilityPower,
        cooldownReduction: heroCreated.cooldownReduction,
        armourPenetration: heroCreated.armourPenetration,
        armourPenetrationProc: heroCreated.armourPenetrationProc,
        magicPenetration: heroCreated.magicPenetration,
        magicPenetrationProc: heroCreated.magicPenetrationProc,
        lifeSteal: heroCreated.lifeSteal,
        apLifeSteal: heroCreated.apLifeSteal,
        tenacity: heroCreated.tenacity,
        criticalChance: heroCreated.criticalChance,
      })
      .pipe(
        map((reponse: any) => {
          const eq = reponse;
        })
      );
  }

  setSelectedHero(heroId: number) {
    this.selectedHeroId.next(heroId);
  }

  getHeroeData(selectedHeroId: number) {
    let paginatedResult: IHeroCreator = {
      id: 0,
      heroName: '',
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
      abilityPower: 0,
      cooldownReduction: 0,
      armourPenetration: 0,
      armourPenetrationProc: 0,
      magicPenetration: 0,
      magicPenetrationProc: 0,
      lifeSteal: 0,
      apLifeSteal: 0,
      tenacity: 0,
      criticalChance: 0,
    };

    let params = new HttpParams();

    if (selectedHeroId != null) {
      params = params.append('heroId', selectedHeroId.toString());
    }

    return this.http
      .get<IHeroCreator>(this.baseUrl + '/GetHeroesToModify', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult = response.body;
          return paginatedResult;
        })
      );
  }
}
