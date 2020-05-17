import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IAddEquipment } from '../models/IAddEquipment';
import { map, finalize } from 'rxjs/operators';
import { IEquipments } from '../models/IEquipments';
import { PaginatedResult } from '../models/pagination';
import { EquipmentModule } from '../my-equipments/equipment/equipment.module';
import { IEquipmentToGetStatistics } from '../models/IEquipmentToGetStatistics';

@Injectable({
  providedIn: 'root'
})
export class MyEquipmentService {
baseUrl: any = environment.apiUrl + '/MyEquipments';

// private myEquipmentsSubject = new BehaviorSubject();
constructor(private http: HttpClient) { }

private equipmentByIdSubject =  new BehaviorSubject<IEquipmentToGetStatistics>({
  heroLvl: 0,
  heroId: 0,
  firtItemId: 0,
  secondItemId: 0,
  thirdItemId: 0,
  fourthItemId: 0,
  fifthItemId: 0,
  sixthItemId: 0
  });

private equipmentsSubject = new BehaviorSubject<PaginatedResult<IEquipments[]>>({
  result: [{
    equipmentId: 0,
    eqName: '',
    heroName: '',
    heroLvl: 0,
    counterOfLikes: 0,
    userName: ''
  }],
  pagination: {
    currentPage: 0,
    itemsPerPage: 10,
    totalItems: 10,
    totalPages: 1
  }
});

private loadingSubject = new BehaviorSubject<boolean>(false);
public loading$ = this.loadingSubject.asObservable();

private selectedEquipmentId = new BehaviorSubject<number>(-1);
public selectedEquipmentId$ = this.selectedEquipmentId.asObservable();

setSelectedEquipmentId(equipmentId: number) {
  this.selectedEquipmentId.next(equipmentId);
}

loadEquipmentById(equipmentId: number) {
  this.getEquipmentById(equipmentId).subscribe((res) => {
    this.equipmentByIdSubject.next(res);
  });
}


getEquipmentById(equipmentId: number): Observable<IAddEquipment> {
  // let getEquipmentById: IEquipments {
  //   equipmentId: 0,
  //   eqName: '',
  //   heroName: '',
  //   heroLvl: 0,
  //   counterOfLikes: 0,
  //   userName: ''
  // };
  let params = new HttpParams();

  if ( equipmentId != null ) {
    params = params.append('equipmentId', equipmentId.toString());
  }

  return this.http.get<IAddEquipment>(this.baseUrl + '/GetEquipmentById', {
    observe: 'response',
    params
  }).pipe(
    map((response) => {
      return response.body;
    }
  ));
}

loadItems(userId: number, page?, itemsPerPage?) {
  this.loadingSubject.next(true);

  this.getEquipments(userId, page, itemsPerPage).pipe(
    finalize(() => this.loadingSubject.next(false))
  )
  .subscribe((res) => {
    this.equipmentsSubject.next(res);
  });
}

getEquipments(userId: number, page?, itemsPerPage?): Observable<PaginatedResult<IEquipments[]>> {

  const paginatedResult: PaginatedResult<IEquipments[]> = new PaginatedResult<IEquipments[]>();
  let params = new HttpParams();

  if ( page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSiez', itemsPerPage);
  }

  if ( userId != null ) {
    params = params.append('userId', userId.toString());
  }

  return this.http.get<IEquipments[]>(this.baseUrl + '/GetEquipments', {
    observe: 'response',
    params
  }).pipe(
    map((response) => {
      paginatedResult.result = response.body;
      if ( response.headers.get('Pagination') != null ) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    }
  ));
}


// getEquipments(): Observable<IEquipments[]> {
//   return this.http.get<IEquipments[]>(this.baseUrl + '');
// }


addEquipment(addedEq: IAddEquipment) {
  //  let params = new HttpParams();
  let eqCreated: IAddEquipment = addedEq;
/*
  if (eqCreated) {
    params = params.append('eqName', eqCreated.eqName);
    params = params.append('heroId', eqCreated.heroId.toString());
    params = params.append('userId', eqCreated.userId.toString());
    params = params.append('firtItemId', eqCreated.firtItemId.toString());
    params = params.append('secondItemId', eqCreated.secondItemId.toString());
    params = params.append('thirdItemId', eqCreated.thirdItemId.toString());
    params = params.append('fourthItemId', eqCreated.fourthItemId.toString());
    params = params.append('fifthItemId', eqCreated.fifthItemId.toString());
    params = params.append('sixthItemId', eqCreated.sixthItemId.toString());
  }
*/

  return this.http.post<IAddEquipment>(this.baseUrl + '/addEquipment' , {
    eqName: eqCreated.eqName,
    heroId: eqCreated.heroId,
    heroLvl: eqCreated.heroLvl,
    userId: eqCreated.userId,
    firtItemId: eqCreated.firtItemId,
    secondItemId: eqCreated.secondItemId,
    thirdItemId: eqCreated.thirdItemId,
    fourthItemId: eqCreated.fourthItemId,
    fifthItemId: eqCreated.fifthItemId,
    sixthItemId: eqCreated.sixthItemId
  })
  .pipe(
    map((reponse: any) => {
      const eq = reponse;
    })
  );
  // .subscribe( addEq => {
  //   console.log(addEq);
  // });

}


updateEquipment(addedEq: IAddEquipment, pickedEquipmentId: number) {
  //  let params = new HttpParams();
  let eqCreated: IAddEquipment = addedEq;

  return this.http.post<IAddEquipment>(this.baseUrl + '/updateEquipment' , {
    eqName: eqCreated.eqName,
    heroId: eqCreated.heroId,
    heroLvl: eqCreated.heroLvl,
    userId: eqCreated.userId,
    firtItemId: eqCreated.firtItemId,
    secondItemId: eqCreated.secondItemId,
    thirdItemId: eqCreated.thirdItemId,
    fourthItemId: eqCreated.fourthItemId,
    fifthItemId: eqCreated.fifthItemId,
    sixthItemId: eqCreated.sixthItemId,
    equipmentId: pickedEquipmentId
  })
  .pipe(
    map((reponse: any) => {
      const eq = reponse;
    })
  );
  // .subscribe( addEq => {
  //   console.log(addEq);
  // });

}

}
