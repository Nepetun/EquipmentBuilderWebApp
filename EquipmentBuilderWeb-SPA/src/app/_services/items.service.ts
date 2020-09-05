import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { IItems } from "../models/IItems";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, catchError, finalize } from "rxjs/operators";
import { IItemManagement } from "../models/IItemManagement";
import { Pagination, PaginatedResult } from "../models/pagination";
import { IItemsManagementFilter } from "../models/Filters/IItemsManagementFilter";
import { IItemCreate } from '../models/IItemCreate';

@Injectable({
  providedIn: "root",
})
export class ItemsService {
 
  baseUrl: any = environment.apiUrl + '/Items';
  private itemsSubject = new BehaviorSubject<IItems[]>([
    {
      id: 1,
      itemName: '',
      minHeroLvl: 1,
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
  private itemsToManagementSubject = new BehaviorSubject<IItemManagement[]>([
    {
      id: 1,
      itemName: '',
      minHeroLvl: 1,
    },
  ]);

  public itemsToManage$ = this.itemsToManagementSubject.asObservable();

  private selectedItemId = new BehaviorSubject<number>(-1);
  public selectedItemId$ = this.selectedItemId.asObservable();


  constructor(private http: HttpClient) {}

  loadItems() {
    this.loadingSubject.next(true);

    this.getItems()
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe((res) => {
        this.itemsSubject.next(res);
      });
  }

  getItems(): Observable<IItems[]> {
    let items: IItems[] = new Array<IItems>();

    return this.http
      .get<IItems[]>(this.baseUrl + '/GetItems', {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          items = response.body;
          return items;
        })
      );
  }

  loadItemsToManagement(
    pagination: Pagination,
    filters: IItemsManagementFilter
  ) {
    this.loadingSubject.next(true);
    this.getItemsToManagement(
      pagination.currentPage,
      pagination.itemsPerPage,
      filters
    )
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe((res) => {
        this.itemsToManagementSubject.next(res.result);
        this.paginationSubject.next(res.pagination);
      });
  }
  getItemsToManagement(
    page?,
    itemsPerPage?,
    filters?
  ): Observable<PaginatedResult<IItems[]>> {
    let itemsToManage: PaginatedResult<IItems[]> = new PaginatedResult<
      IItems[]
    >();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (filters) {
      if (filters.itemNameLike) {
        params = params.append('itemNameLike', filters.itemNameLike);
      } else {
        params = params.append('itemNameLike', '');
      }
    }

    return this.http
      .get<IItems[]>(this.baseUrl + '/GetItemsToManagement', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          itemsToManage.result = response.body;
          if (response.headers.get('Pagination') != null) {
            itemsToManage.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return itemsToManage;
        })
      );
  }


  setSelectedItemId(userId: number) {
    this.selectedItemId.next(userId);
  }

  addItem(itemToCreate: IItemCreate) {
    return this.http
      .post<IItemCreate>(this.baseUrl + '/AddItem', {
        id: itemToCreate.id,
        itemName: itemToCreate.itemName,
        minHeroLvl: itemToCreate.minHeroLvl,
        // itemstats
        itemId: itemToCreate.itemId,
        price: itemToCreate.price,
        additionalHp: itemToCreate.additionalHp,
        additionalDmg: itemToCreate.additionalDmg,
        additionalLifeSteal: itemToCreate.additionalLifeSteal,
        additionalAp: itemToCreate.additionalAp,
        additionalManaRegen: itemToCreate.additionalManaRegen,
        additionalPotionPower: itemToCreate.additionalPotionPower,
        additionalHitPointsPerHit: itemToCreate.additionalHitPointsPerHit,
        additionalGoldPerTenSec: itemToCreate.additionalGoldPerTenSec,
        additionalBasicManaRegenPercentage: itemToCreate.additionalBasicManaRegenPercentage,
        additionalBasicHpRegenPercentage: itemToCreate.additionalBasicHpRegenPercentage,
        additionalArmour: itemToCreate.additionalArmour,
        additionalMana: itemToCreate.additionalMana,
        additionalMagicResist: itemToCreate.additionalMagicResist,
        additionalCooldownReduction: itemToCreate.additionalCooldownReduction,
        additionalAttackSpeed: itemToCreate.additionalAttackSpeed,
        additionalMovementSpeed: itemToCreate.additionalMovementSpeed,
        additionalCriticalChance: itemToCreate.additionalCriticalChance,
        descriptions: itemToCreate.descriptions
      })
      .pipe(
        map((reponse: any) => {
          const eq = reponse;
        })
      );
  }


  modifyItem(itemToModify: IItemCreate) {
    return this.http
      .post<IItemCreate>(this.baseUrl + '/UpdateItem', {
        id: itemToModify.id,
        itemName: itemToModify.itemName,
        minHeroLvl: itemToModify.minHeroLvl,
        // itemstats
        itemId: itemToModify.itemId,
        price: itemToModify.price,
        additionalHp: itemToModify.additionalHp,
        additionalDmg: itemToModify.additionalDmg,
        additionalLifeSteal: itemToModify.additionalLifeSteal,
        additionalAp: itemToModify.additionalAp,
        additionalManaRegen: itemToModify.additionalManaRegen,
        additionalPotionPower: itemToModify.additionalPotionPower,
        additionalHitPointsPerHit: itemToModify.additionalHitPointsPerHit,
        additionalGoldPerTenSec: itemToModify.additionalGoldPerTenSec,
        additionalBasicManaRegenPercentage: itemToModify.additionalBasicManaRegenPercentage,
        additionalBasicHpRegenPercentage: itemToModify.additionalBasicHpRegenPercentage,
        additionalArmour: itemToModify.additionalArmour,
        additionalMana: itemToModify.additionalMana,
        additionalMagicResist: itemToModify.additionalMagicResist,
        additionalCooldownReduction: itemToModify.additionalCooldownReduction,
        additionalAttackSpeed: itemToModify.additionalAttackSpeed,
        additionalMovementSpeed: itemToModify.additionalMovementSpeed,
        additionalCriticalChance: itemToModify.additionalCriticalChance,
        descriptions: itemToModify.descriptions
      })
      .pipe(
        map((reponse: any) => {
          const eq = reponse;
        })
      );
  }



  getItemeData(selectedItemId: number) {
    let paginatedResult: IItemCreate = {
      id: 0,
      itemName: '',
      minHeroLvl: 1,
      // itemstats
      itemId: 0,
      price: 0,
      additionalHp: 0,
      additionalDmg: 0,
      additionalLifeSteal: 0,
      additionalAp: 0,
      additionalManaRegen: 0,
      additionalPotionPower: 0,
      additionalHitPointsPerHit: 0,
      additionalGoldPerTenSec: 0,
      additionalBasicManaRegenPercentage: 0,
      additionalBasicHpRegenPercentage: 0,
      additionalArmour: 0,
      additionalMana: 0,
      additionalMagicResist: 0,
      additionalCooldownReduction: 0,
      additionalAttackSpeed: 0,
      additionalMovementSpeed: 0,
      additionalCriticalChance: 0,
      descriptions: '',
    };

    let params = new HttpParams();

    if (selectedItemId != null) {
      params = params.append('itemId', selectedItemId.toString());
    }

    return this.http
      .get<IItemCreate>(this.baseUrl + '/GetItemToModify', {
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
