import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private selectedUserId = new BehaviorSubject<number>(-1);
  public selectedUserId$ = this.selectedUserId.asObservable();

constructor(private http: HttpClient) { }

setSelectedUserId(userId: number) {
  this.selectedUserId.next(userId);
}

}
