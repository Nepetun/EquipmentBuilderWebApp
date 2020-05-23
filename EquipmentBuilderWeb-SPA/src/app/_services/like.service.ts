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

      deleteComment(commentId: number) {
        // const options = {
        //   headers: new HttpHeaders({
        //     // 'Content-Type': 'application/json',
        //   }),
        //   body: {
        //     commentId: 1
        //   },
        // };
        let params = new HttpParams();
    
        if ( commentId != null) {
          params = params.append('commentId', commentId.toString());
        }
    
        // let httpParams = new HttpParams().set('commentId', commentId.toString());
        // let options = { params: httpParams };
    
        return this.http.delete(this.baseUrl + '/DeleteComment', {
          observe: 'response',
          params
        })
        .pipe(
          map((reponse: any) => {
            const com = reponse;
          })
        ).subscribe( commentDeleted => {
              console.log(commentDeleted);
        });
      }

}
