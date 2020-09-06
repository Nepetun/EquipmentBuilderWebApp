import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Pagination, PaginatedResult } from "../models/pagination";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IGames } from "../models/IGames";
import { map } from "rxjs/internal/operators/map";
import { Observable } from "rxjs/internal/Observable";
import { finalize } from "rxjs/internal/operators/finalize";

@Injectable({
  providedIn: "root",
})
export class GamesService {
  baseUrl: any = environment.apiUrl + "/Games";
  private paginationSubject = new BehaviorSubject<Pagination>({
    currentPage: 1,
    itemsPerPage: 100,
    totalItems: 100,
    totalPages: 10,
  });
  public pagination$ = this.paginationSubject.asObservable();

  private selectedGameId = new BehaviorSubject<number>(-1);
  public selectedGameId$ = this.selectedGameId.asObservable();

  private gamesSubject = new BehaviorSubject<IGames[]>([
    {
      id: 1,
      gameName: "",
    },
  ]);
  public games$ = this.gamesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadGames(pagination: Pagination) {
    this.getGames(pagination.currentPage,
      pagination.itemsPerPage)
      .pipe()
      .subscribe((res) => {
        this.gamesSubject.next(res.result);
        this.paginationSubject.next(res.pagination);
      });
  }

  getGames(page, itemsPerPage): Observable<PaginatedResult<IGames[]>> {
    let items: PaginatedResult<IGames[]> = new PaginatedResult<IGames[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    return this.http
      .get<IGames[]>(this.baseUrl + "/GetGames", {
        observe: "response",
        params,
      })
      .pipe(
        map((response) => {
          items.result = response.body;
          if (response.headers.get("Pagination") != null) {
            items.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return items;
        })
      );
  }

  getGamesToLookUp(): Observable<IGames[]> {
    let items: IGames[] = new Array<IGames>();

    return this.http
      .get<IGames[]>(this.baseUrl + "/GetGames", {
        observe: "response",
      })
      .pipe(
        map((response) => {
          items = response.body;
          return items;
        })
      );
  }

  setSelectedGameId(gameId: number) {
    this.selectedGameId.next(gameId);
  }

  addGame(gameToCreate: IGames) {
    return this.http
      .post<IGames>(this.baseUrl + "/CreateGame", {
        id: gameToCreate.id,
        gameName: gameToCreate.gameName,
      })
      .pipe(
        map((reponse: any) => {
          const eq = reponse;
        })
      );
  }
}
