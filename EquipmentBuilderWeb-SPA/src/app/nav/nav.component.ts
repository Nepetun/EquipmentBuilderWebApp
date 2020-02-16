import { Component, OnInit } from '@angular/core';
import { logging } from 'protractor';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    // ze wzgledu na to ze metoda login jest observable uzywamy subscribe
    this.authService.login(this.model).subscribe(next => {
        this.alertify.success('Zalogowano pomyślnie');
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
    // return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Wylogowano');
  }
}
