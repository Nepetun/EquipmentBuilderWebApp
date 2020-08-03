import { Component, OnInit } from '@angular/core';
import { logging } from 'protractor';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { tokenName } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 model: any = {};
 userId: number = -1;
 isAdmin: boolean = false;
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    let userIdString = this.authService.getUserIdByUserName();
    this.userId = +userIdString;
    this.authService.checkIsAdmin(this.userId).subscribe((grp) => {
      this.isAdmin = grp;
    });
  }

  login() {
    // ze wzgledu na to ze metoda login jest observable uzywamy subscribe
    this.authService.login(this.model).subscribe(next => {
        this.alertify.success('Zalogowano pomyślnie');
      }, error => {
        this.alertify.error(error);
      }, () => { // tutaj dziłanie  w przypadku completed z wykorzystaniem anonimowej funkcji
          // sprawdzenei id użytkownika
          let userIdString = this.authService.getUserIdByUserName();
          this.userId = +userIdString;
          // sprawdzenie czy uzytkownik jest administratorem
          this.authService.checkIsAdmin(this.userId).subscribe((grp) => {
            this.isAdmin = grp;
          });
          this.router.navigate(['/myEquipments']);
      });
  }

  loggedIn() {
    return this.authService.loggedIn();
    // return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Wylogowano');
    this.router.navigate(['/home']);
  }
}
