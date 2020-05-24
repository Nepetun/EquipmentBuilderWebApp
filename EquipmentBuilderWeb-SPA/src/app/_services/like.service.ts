import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComment } from '../models/IComment';
import { map } from 'rxjs/operators';
import { IAddComment } from '../models/IAddComment';
import { ILike } from '../models/ILike';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
    baseUrl: any = environment.apiUrl + '/Like';
    constructor(private http: HttpClient) { }
    
    addLike(likeObject: ILike) {
      let like : ILike = likeObject;
      return this.http.post<ILike>(this.baseUrl + '/AddLike' , {
        equipmentId: like.equipmentId,
        userId: like.userId
      })
      .pipe(
        map((reponse: any) => {
          const likee = reponse;
        })
      ).subscribe( likeAdded => {
            console.log(likeAdded);
       });
      }

}
