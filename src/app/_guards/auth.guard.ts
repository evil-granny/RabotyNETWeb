import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // if (localStorage.getItem('currentUser')) {
    //   // logged in so return true
    //   return true;
    // }
    let currentUser;

    try {
      currentUser = this.authenticationService.currentUserValue;
    } catch { return false; }

    console.log('AuthGuard.ts:  ' + currentUser);

    if (currentUser) {
      // check if route is restricted by role

      if (route.data.roles && route.data.roles.indexOf(currentUser.roles.toString()) === -1) {
        // role not authorised so redirect to home page
     // if (route.data.roles) {
       // console.log("!!"+route.data.roles.indexOf(currentUser.roles.toString()));
        console.log('-----------AuthGuard-----------')
        console.log('route.data.roles ' + route.data.roles);
        console.log('currentUser.roles ' + currentUser.roles);
        console.log(route.data.roles.indexOf(currentUser.roles));
        this.router.navigate(['/accessDenied']).then(
err => {
            throw err;
            console.log('********ERROR 1********');
            console.log(err);
          },
err => {
          throw err;
          console.log('********ERROR 2********');
          console.log(err);
        });

        return false;
      }

      // authorised so return true
      return true;

      // // not logged in so redirect to login page
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      // return false;
    } else {
      this.router.navigate(['/login']);
      return false; }
  }
}
