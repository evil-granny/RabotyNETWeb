import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {UserPrincipal} from '../models/userPrincipal.model';
import { map } from 'rxjs/operators';


@Injectable( { providedIn: 'root' } )
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserPrincipal>;
  public currentUser: Observable<UserPrincipal>;

  private userLoginUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserPrincipal>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserPrincipal {
    return this.currentUserSubject.value;
  }

  public authenticate(credentials) {

    const authHeader = credentials ? {
      'Authorization' : 'Basic ' + btoa(credentials.username + ':' + credentials.password),
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    } : {};
    console.log('AUTH_HEADER');
    console.log(authHeader);

    const httpOptions = {
      headers: new HttpHeaders(authHeader)
    };

    return this.http.post<any>(this.userLoginUrl, credentials, httpOptions)
      .pipe(map(currentUser => {
        let userPrincipal: UserPrincipal;
        if (currentUser) {
          const name = currentUser.username;
          const userRoles = currentUser.authorities;
          const roles: Array<string> = new Array<string>();
          userRoles.forEach(function (key) {
            roles.push(key.authority);
          });
          const token = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
          userPrincipal = new UserPrincipal(name, roles, token);
          localStorage.setItem('currentUser', JSON.stringify(userPrincipal));
          this.currentUserSubject.next(userPrincipal);
        }
        return userPrincipal;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
