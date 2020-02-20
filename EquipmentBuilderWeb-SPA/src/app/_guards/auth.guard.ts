import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { templateJitUrl } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true; // informacja, że jesteśmy zalogowani wystarczy w celu zmiany patha
    }

    this.alertify.error('Nie jesteś zalogowany. Zaloguj się nastepnie korzystaj z funkcjonalności');
    this.router.navigate(['/home']);
    return false;
  }


}
