import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material';

import { User } from '../models/user.model';

import { Observable } from 'rxjs';

import { APP_CONFIG, IAppConfig } from '../app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': new IAppConfig().allowOrigin,
    'Access-Control-Allow-Credentials': 'true',
  }), withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public dialog: MatDialog, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private userUrl = this.rabotyNETEndpoint.apiEndpoint + '/users/';

  error: any;

  public validUser(email: any) {
    return this.http.get<String>(this.userUrl + 'enabled/' + email + '/', httpOptions);
  }

  public findByEmail(user: User): Observable<any> {
    return this.http.get<User[]>(this.userUrl + 'username/' + user.login + '/', httpOptions);
  }

  public findById(userId: number): Observable<any> {
    return this.http.get<User>(this.userUrl + userId, httpOptions);
  }

  public insert(user: any) {
    return this.http.post<User>(this.userUrl + 'auth', user, httpOptions);
  }

  public validToken(token: String): Observable<any> {
    return this.http.get<String>(this.userUrl + 'auth/confirm?token=' + token, httpOptions);
  }


  public findToken(username: any): Observable<any> {
    return this.http.get<String>(this.userUrl + 'findToken?email=' + username, httpOptions);
  }

  public resendToken(email: String): Observable<any> {
    return this.http.post<String>(this.userUrl + 'resendAuthToken?email=' + email, httpOptions);
  }

  public getUserRoles(userName: String): Observable<any> {
    return this.http.get<String[]>(this.userUrl + 'getRoles/' + userName + '/', httpOptions);
  }

}
