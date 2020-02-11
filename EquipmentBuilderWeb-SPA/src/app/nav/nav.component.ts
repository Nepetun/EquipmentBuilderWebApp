import { Component, OnInit } from '@angular/core';
import { logging } from 'protractor';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    // ze wzgledu na to ze metoda login jest observable uzywamy subscribe
    this.authService.login(this.model).subscribe(next => {
        console.log('logged in sucesfully');
      }, error => {
        console.log(error);
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token; // !! zwraca tru or false -> true jezeli jest token, false jezeli jest pusty
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out :c');
  }
}
