import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {Role} from '../models/roles.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // if (localStorage.getItem('currentUser')) {
    //   // logged in so return true
    //   return true;
    // }
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      // check if route is restricted by role

      if (route.data.roles && route.data.roles.indexOf(currentUser.roles.toString()) === -1) {
        // role not authorised so redirect to home page
     // if (route.data.roles) {
       // console.log("!!"+route.data.roles.indexOf(currentUser.roles.toString()));
        console.log("-----------AuthGuard-----------")
        console.log("route.data.roles " + route.data.roles);
        console.log("currentUser.roles "+ currentUser.roles);
        console.log(route.data.roles.indexOf(currentUser.roles));
        this.router.navigate(['/']);

        return false;
      }

      // authorised so return true
      return true;

      // // not logged in so redirect to login page
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      // return false;
    }
  }
}
