import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pagination, PaginatedResult } from '../models/pagination';
import { IInvitationSend } from '../models/IInvitationSend';
import { map, finalize } from 'rxjs/operators';
import { IInvitation } from '../models/IInvitation';
import { IInvitationOperation } from '../models/IInvitationOperation';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  baseUrl: any = environment.apiUrl + '/Invitation';

  constructor(private http: HttpClient) { }

  private paginationSubject = new BehaviorSubject<Pagination>({
    currentPage: 1,
    itemsPerPage: 100,
    totalItems: 100,
    totalPages: 10
  });

  private invitationSubject = new BehaviorSubject<IInvitation[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public pagination$ = this.paginationSubject.asObservable();
  public invitation$ = this.invitationSubject.asObservable();

  loadInvitations(userId: number, pagination: Pagination) {
    this.getInvitations(userId, pagination.currentPage, pagination.itemsPerPage).pipe(
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((res) => {
      this.invitationSubject.next(res.result);
      this.paginationSubject.next(res.pagination);
    });
 }


 getInvitations(userId: number, page?, itemsPerPage?): Observable<PaginatedResult<IInvitation[]>> {
  const paginatedResult: PaginatedResult<IInvitation[]> = new PaginatedResult<IInvitation[]>();
   let params = new HttpParams();

  if ( page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
   }

  if ( userId != null ) {
     params = params.append('userId', userId.toString());
   }

  return this.http.get<IInvitation[]>(this.baseUrl + '/GetRecivedInvitations', {
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


  sendInvitation(invitation: IInvitationSend) {
    //  let params = new HttpParams();
    let invitationSend: IInvitationSend = invitation;

    return this.http.post<IInvitationSend>(this.baseUrl + '/SendInvitation' , {
      userId: invitationSend.userId,
      recipientUserId: invitationSend.recipientUserId,
      invitationGroupId: invitationSend.invitationGroupId
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

  acceptInvitation(invitation: IInvitationOperation) {
    let invitationAccept: IInvitationOperation = invitation;

    return this.http.post<IInvitationSend>(this.baseUrl + '/AcceptInvitation' , {
      userId: invitationAccept.userId,
      invitationId: invitationAccept.invitationId
    })
    .pipe(
      map((reponse: any) => {
        const eq = reponse;
      })
    );
  }

  rejectInvitation(invitation: IInvitationOperation) {
    let invitationReject: IInvitationOperation = invitation;

    // return this.http.delete<IInvitationSend>(this.baseUrl + '/RejectInvitation' , {
    //   userId: invitationReject.userId,
    //   invitationId: invitationReject.invitationId
    // })
    // .pipe(
    //   map((reponse: any) => {
    //     const eq = reponse;
    //   })
    // );

    let params = new HttpParams();

    if ( invitationReject.userId != null) {
      params = params.append('userId', invitationReject.userId.toString());
    }
    if ( invitationReject.invitationId != null) {
      params = params.append('invitationId', invitationReject.invitationId.toString());
    }

    return this.http.delete(this.baseUrl + '/RejectInvitation', {
      observe: 'response',
      params
    })
    .pipe(
      map((reponse: any) => {
        const grp = reponse;
      })
    ).subscribe( invitationRejected => {
          console.log(invitationRejected);
    });
  }


}
