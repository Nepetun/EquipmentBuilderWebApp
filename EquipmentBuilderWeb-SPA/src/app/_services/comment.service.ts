import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComment } from '../models/IComment';
import { map } from 'rxjs/operators';
import { IAddComment } from '../models/IAddComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
baseUrl: any = environment.apiUrl + '/Comment';

private commentForEquipmentByIdSubject =  new BehaviorSubject<IComment[]>([{
  commentString: '',
  userName: '',
  tmstmp: new Date(),
  commentId: -1
  }]);


constructor(private http: HttpClient) { }

loadCommentForEquipment(equipmentId: number) {
  this.getCommentForEquipmentById(equipmentId).subscribe((res) => {
    this.commentForEquipmentByIdSubject.next(res);
  });
}


getCommentForEquipmentById(equipmentId: number): Observable<IComment[]> {

  let params = new HttpParams();

  if ( equipmentId != null ) {
    params = params.append('equipmentId', equipmentId.toString());
  }

  return this.http.get<IComment[]>(this.baseUrl + '/GetCommentsForEquipment', {
    observe: 'response',
    params
  }).pipe(
    map((response) => {
      return response.body;
    }
  ));
}




addComment(commentObject: IAddComment) {
  let commentt : IAddComment = commentObject;
  return this.http.post<IAddComment>(this.baseUrl + '/addComment' , {
    equipmentId: commentt.equipmentId,
    commentString: commentt.commentString,
    userId: commentt.userId
  })
  .pipe(
    map((reponse: any) => {
      const com = reponse;
    })
  ).subscribe( commentAdded => {
        console.log(commentAdded);
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
