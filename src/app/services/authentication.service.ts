import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserPrincipal } from '../models/userPrincipal.model';
import { map } from 'rxjs/operators';
import { logger } from 'codelyzer/util/logger';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserPrincipal>;
  public currentUser: Observable<UserPrincipal>;

  private userLoginUrl = 'http://localhost:8080/login';
  private userLogoutUrl = 'http://localhost:8080/logout';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserPrincipal>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserPrincipal {
    return this.currentUserSubject.value;
  }

  public authenticate(credentials) {

    const authHeader = credentials ? {
      'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password),
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json'
    } : {};
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
          const userId = currentUser.userID;
          const token = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
          userPrincipal = new UserPrincipal(name, roles, token, userId);
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
    this.http.get<any>(this.userLogoutUrl);
  }
}
