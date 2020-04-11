import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IItems } from '../models/IItems';
import { HttpClient } from '@angular/common/http';
import { map, catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
baseUrl: any = environment.apiUrl + '/Items';
private itemsSubject = new BehaviorSubject<IItems[]>([{
  id: 1,
  itemName: '',
  minHeroLvl: 1
}]);

private loadingSubject = new BehaviorSubject<boolean>(false);
public loading$ = this.loadingSubject.asObservable();

constructor(private http: HttpClient) { }

loadItems() {
  this.loadingSubject.next(true);

  this.getItems().pipe(
    finalize(() => this.loadingSubject.next(false))
  )
  .subscribe((res) => {
    this.itemsSubject.next(res);
  });
}

getItems(): Observable<IItems[]> {
  let items: IItems[] = new Array<IItems>();

  return this.http.get<IItems[]>(this.baseUrl + '/GetItems', {
    observe: 'response'
  }).pipe(
    map((response) => {
      items = response.body;
      return items;
    }
  ));
}

}
