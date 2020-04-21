import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, finalize } from 'rxjs/operators';
import { IHero } from '../models/IHero';

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

  constructor(private http: HttpClient) { }
/*
  loadHeroes() {
    this.loadingSubject.next(true);

    this.getHeroes().pipe(
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((res) => {
      this.heroesSubject.next(res);
    });
  }*/

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
}
