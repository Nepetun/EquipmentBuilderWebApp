import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGroupCreate } from '../models/IGroupCreate';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseUrl: any = environment.apiUrl + '/Group';

  constructor(private http: HttpClient) { }

  createGroup(group: IGroupCreate) {
    //  let params = new HttpParams();
    let groupCreated: IGroupCreate = group;

    return this.http.post<IGroupCreate>(this.baseUrl + '/CreateGroup' , {
      userId: groupCreated.userId,
      groupName: groupCreated.groupName,
      groupId: groupCreated.groupId
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
