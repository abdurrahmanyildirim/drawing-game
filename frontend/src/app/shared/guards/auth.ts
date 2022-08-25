import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Observable((observer) => {
      if (this.authService.isLoggedIn()) {
        observer.next(true);
        observer.complete();
      } else {
        this.router.navigate(['/login']);
        observer.next(false);
        observer.complete();
      }
    });
  }
}
