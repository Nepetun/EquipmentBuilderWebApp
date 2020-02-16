import { Component, OnInit } from '@angular/core';
import { logging } from 'protractor';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    // ze wzgledu na to ze metoda login jest observable uzywamy subscribe
    this.authService.login(this.model).subscribe(next => {
        this.alertify.success('logged in sucesfully');
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  loggedIn() {
    this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out :c');
  }
}
