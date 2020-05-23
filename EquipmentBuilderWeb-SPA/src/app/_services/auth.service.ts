import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'// który moduł może skorzystać z serwisu - dla nas jest to appmodule
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  
constructor(private http: HttpClient) { }

/* metoda logowania - tworzymy post tak jak za pomocą postmana
do metody login - co przesyłamy?
przesyłamy nasz model - który będzie z naszej formy angularowej
następnie musimy użyć pipe - ze wzgledu na to ze serwer zwroci token
musimy go przekazac za pomoca pipe - dla observable
i przetwarzamy go za pomoca map
mapujemy response - jako jakikolwiek typ
map bo klucz i wartosc
jezeli user istnieje to ustawiamy localstorage na jego token
*/
login(model: any) {


  return this.http.post(this.baseUrl + 'login' , model)
  .pipe(
    map((reponse: any) => {
      const user = reponse;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        console.log(this.decodedToken);
        localStorage.setItem('userId', this.decodedToken.nameid);
        localStorage.setItem('userName', this.decodedToken.unique_name);
      }
    })
  );
}

getUserIdByUserName() {
  return localStorage.getItem('userId');
}

getUserName() {
  return localStorage.getItem('userName');
}

register(model: any) {
  // metoda ma za zadanie wywołać post na api z modelem - czyli loginem i haslem
  return this.http.post(this.baseUrl + 'register' , model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token); // jezeli wygsnie to zwraca false
}

}
