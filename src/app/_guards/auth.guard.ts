import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let currentUser;

    try {
      currentUser = this.authenticationService.currentUserValue;
    } catch { return false; }

    console.log('AuthGuard.ts:  ' + currentUser);

    if (currentUser) {

      let roleHolder;

      currentUser.roles.forEach(  key => {
        if (route.data.roles && route.data.roles.indexOf(key.toString()) === -1) {
          // role not authorised so redirect to access denied page
          console.log('-----------AuthGuard-----------')
          console.log('route.data.roles ' + route.data.roles);
          console.log('currentUser.roles ' + currentUser.roles);
          console.log(route.data.roles.indexOf(currentUser.roles));
        } else {
          console.log('Role after checking ' + key.toString());
          roleHolder = currentUser.roles;
        }
      });

      if (!roleHolder) {
        this.router.navigate(['/accessDenied']);
        return false;
      }



      // // check if route is restricted by role
      // if (route.data.roles && route.data.roles.indexOf(currentUser.roles.toString()) === -1) {
      //   // role not authorised so redirect to access denied page
      //   console.log('-----------AuthGuard-----------')
      //   console.log('route.data.roles ' + route.data.roles);
      //   console.log('currentUser.roles ' + currentUser.roles);
      //   console.log(route.data.roles.indexOf(currentUser.roles));
      //   this.router.navigate(['/accessDenied']);
      //
      //   return false;
      // }

      // authorised so return true
      return true;

    } else {
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false; }
  }
}
