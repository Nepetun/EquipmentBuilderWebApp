import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGroupCreate } from '../models/IGroupCreate';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { IGroups } from '../models/IGroups';
import { Pagination, PaginatedResult } from '../models/pagination';
import { group } from 'console';
import { IGroupFilter } from '../models/Filters/IGroupFilter';
import { IUser } from '../models/IUser';
import { IGroupModify } from '../models/IGroupModify';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseUrl: any = environment.apiUrl + '/Group';

  constructor(private http: HttpClient) { }

  private groupByIdSubject = new BehaviorSubject<IGroupModify>({
    groupId: 0,
    groupName: '',
    userId: 0
  });

  private userToGroupSubject = new BehaviorSubject<IUser[]>([]);

  private groupSubject = new BehaviorSubject<IGroups[]>([]);

  private paginationSubject = new BehaviorSubject<Pagination>({
    currentPage: 1,
    itemsPerPage: 100,
    totalItems: 100,
    totalPages: 10
  });

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public pagination$ = this.paginationSubject.asObservable();
  public groups$ = this.groupSubject.asObservable();

  private selectedGroupId = new BehaviorSubject<number>(-1);
  public selectedGroupId$ = this.selectedGroupId.asObservable();

  setSelectedGroupId(groupId: number) {
    this.selectedGroupId.next(groupId);
  }

   loadGroupById(groupId: number) {
     this.getGroupById(groupId).subscribe((res) => {
       this.groupByIdSubject.next(res);
     });
  }


  getGroupById(group: number): Observable<IGroupModify> {

    let params = new HttpParams();

    if ( group != null ) {
      params = params.append('groupId', group.toString());
    }

    return this.http.get<IGroupModify>(this.baseUrl + '/GetGroupById', {
      observe: 'response',
      params
    }).pipe(
      map((response) => {
        return response.body;
      }
    ));
  }

  loadGroups(userId: number, pagination: Pagination, filters: IGroupFilter) {
    this.loadingSubject.next(true);

    this.getGroups(userId, pagination.currentPage, pagination.itemsPerPage, filters).pipe(
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((res) => {
      this.groupSubject.next(res.result);
      this.paginationSubject.next(res.pagination);
    });
  }

  getGroups(userId: number, page?, itemsPerPage?, filters?): Observable<PaginatedResult<IGroups[]>> {

    const paginatedResult: PaginatedResult<IGroups[]> = new PaginatedResult<IGroups[]>();
    let params = new HttpParams();

    if ( page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if ( userId != null ) {
      params = params.append('userId', userId.toString());
    }

    if(filters) {
      let filtersData : IGroupFilter = filters;

      if (filtersData.groupAdminNameLike){
        params = params.append('groupAdminNameLike', filtersData.groupAdminNameLike);
      } else {
        params = params.append('groupAdminNameLike', '');
      }

      if (filtersData.groupNameLike) {
        params = params.append('groupNameLike', filtersData.groupNameLike);
      } else {
        params = params.append('groupNameLike', '');
      }
    }

    return this.http.get<IGroups[]>(this.baseUrl + '/GetUserGroups', {
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


updateGroup(modifyGroup: IGroupModify) {
  //  let params = new HttpParams();
  let groupModify: IGroupModify = modifyGroup;

  return this.http.post<IGroupModify>(this.baseUrl + '/ModyfiyGroup' , {
    userId: groupModify.userId,
    groupName: groupModify.groupName,
    groupId: groupModify.groupId
  })
  .pipe(
    map((reponse: any) => {
      const grp = reponse;
    })
  );
  // .subscribe( addEq => {
  //   console.log(addEq);
  // });

}

// usuwanie grupy
deleteGroup(groupId: number) {
  let params = new HttpParams();

  if ( groupId != null) {
    params = params.append('groupId', groupId.toString());
  }

  return this.http.delete(this.baseUrl + '/DeleteGroup', {
    observe: 'response',
    params
  })
  .pipe(
    map((reponse: any) => {
      const grp = reponse;
    })
  ).subscribe( groupDeleted => {
        console.log(groupDeleted);
  });
}


}
