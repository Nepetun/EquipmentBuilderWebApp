import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, finalize } from 'rxjs/operators';
import { IHero } from '../models/IHero';
import { Pagination, PaginatedResult } from '../models/pagination';
import { IHeroesManagementFilter } from '../models/Filters/IHeroesManagementFilter';
import { IHeroesManagement } from '../models/IHeroesManagement';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  baseUrl: any = environment.apiUrl + '/Heroes';
  private heroesSubject = new BehaviorSubject<IHero[]>([{
    id: 1,
    heroName: ''
  }]);

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
      heroName: ''
    },
  ]);

  public heroesToManage$ = this.heroesToManagementSubject.asObservable();

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<IHero[]> {
    let heroes: IHero[] = new Array<IHero>();
    return this.http.get<IHero[]>(this.baseUrl + '/GetAllHeroes', {
      observe: 'response'
    }).pipe(
      map((response) => {
        heroes = response.body;
        return heroes;
      }
    ));
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


}
