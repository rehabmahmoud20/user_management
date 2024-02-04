import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const authGurdGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const curentUserService = inject(AuthService);
  const router = inject(Router);
  return curentUserService.isAuthenticatedUser()
    ? true
    : router.navigate(['/']);
  // return curentUserService
  //   .isAuthenticatedUser()
  //   .pipe(
  //     map(authenticated => {
  //       if (authenticated) {
  //         return true;
  //       } else {
  //         this.router.navigate(['/']);
  //         return false;
  //       }
  //     })
  // return true;
};
