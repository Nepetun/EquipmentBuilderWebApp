import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { IItems } from "../models/IItems";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, catchError, finalize } from "rxjs/operators";
import { IItemManagement } from "../models/IItemManagement";
import { Pagination, PaginatedResult } from "../models/pagination";
import { IItemsManagementFilter } from "../models/Filters/IItemsManagementFilter";

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



}
