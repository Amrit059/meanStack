import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LS_KEY } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.localStorageService.get(LS_KEY.API_TOKEN)) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

}
