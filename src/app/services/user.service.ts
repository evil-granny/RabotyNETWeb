import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public dialog: MatDialog, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private userUrl = this.rabotyNETEndpoint.apiEndpoint + '/users/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.rabotyNETEndpoint.allowOrigin,
      'Access-Control-Allow-Credentials': 'true',
    }), withCredentials: true
  };

  error: any;

  public validUser(email: any) {
    return this.http.get<String>(this.userUrl + 'enabled/' + email + '/', this.httpOptions);
  }

  public findByEmail(user: User): Observable<any> {
    return this.http.get<User[]>(this.userUrl + 'username/' + user.login + '/', this.httpOptions);
  }

  public findById(userId: number): Observable<any> {
    return this.http.get<User>(this.userUrl + userId, this.httpOptions);
  }

  public insert(user: any) {
    return this.http.post<User>(this.userUrl + 'auth', user, this.httpOptions);
  }

  public validToken(token: String): Observable<any> {
    return this.http.get<String>(this.userUrl + 'auth/confirm?token=' + token, this.httpOptions);
  }


  public findToken(username: any): Observable<any> {
    return this.http.get<String>(this.userUrl + 'findToken?email=' + username, this.httpOptions);
  }

  public resendToken(email: String): Observable<any> {
    return this.http.post<String>(this.userUrl + 'resendAuthToken?email=' + email, this.httpOptions);
  }

  public getUserRoles(userName: String): Observable<any> {
    return this.http.get<String[]>(this.userUrl + 'getRoles/' + userName + '/', this.httpOptions);
  }

}
