import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IAddEquipment } from '../models/IAddEquipment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyEquipmentService {
baseUrl: any = environment.apiUrl + '/MyEquipments';

// private myEquipmentsSubject = new BehaviorSubject();
constructor(private http: HttpClient) { }

addEquipment(addedEq: IAddEquipment) {
  let params = new HttpParams();
  let eqCreated: IAddEquipment = addedEq;

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


  return this.http.post<IAddEquipment>(this.baseUrl + '/addEquipment' , {
    eqName: eqCreated.eqName,
    heroId: eqCreated.heroId,
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

}
