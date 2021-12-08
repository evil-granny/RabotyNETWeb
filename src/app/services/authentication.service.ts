import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserPrincipal } from '../models/userPrincipal.model';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserPrincipal>;
  public currentUser: Observable<UserPrincipal>;

  private userLoginUrl = this.rabotyNETEndpoint.apiEndpoint + '/login';
  private userLogoutUrl = this.rabotyNETEndpoint.apiEndpoint + '/logout';

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) {
    this.currentUserSubject = new BehaviorSubject<UserPrincipal>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserPrincipal {
    return this.currentUserSubject.value;
  }

  public authenticate(credentials: { username: any; password: any; }) {
    const authHeader = credentials ? {
      'Authorization': 'Basic ' + window.btoa(unescape(encodeURIComponent(credentials.username + ':' + credentials.password))),
      'Access-Control-Allow-Origin': this.rabotyNETEndpoint.allowOrigin,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    } : {};
    const httpOptions = {
      headers: new HttpHeaders(authHeader), withCredentials: true
    };

    return this.http.post<any>(this.userLoginUrl, credentials, httpOptions)
      .pipe(map(currentUser => {
        let userPrincipal: UserPrincipal;
        if (currentUser) {
          const name = currentUser.username;
          const userRoles = currentUser.authorities;
          const roles: Array<string> = new Array<string>();
          userRoles.forEach(function (key: { authority: string; }) {
            roles.push(key.authority);
          });
          const userId = currentUser.userId;
          const token = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
          userPrincipal = new UserPrincipal(name, roles, token, userId);
          localStorage.setItem('currentUser', JSON.stringify(userPrincipal));
          this.currentUserSubject.next(userPrincipal);
        }

        return userPrincipal;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.http.get<any>(this.userLogoutUrl);
  }

}
