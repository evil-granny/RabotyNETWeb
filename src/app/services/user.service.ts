import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material';
import { ComfirmComponent } from '../confirm/comfirm.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
    'Access-Control-Max-Age': '3600',
    'Access-Control-Allow-Headers': 'X-requested-with, Content-Type'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  private userUrl = 'http://localhost:8080';

  foundUser: User[];
  error: any;


  public findAll(): Observable<any> {
    return this.http.get<User[]>(this.userUrl + "/users", httpOptions);
  }

  public validUser(email: any) {
    return this.http.get<String>(this.userUrl + "/login/enabled/" + email + "/", httpOptions)
  }

  public findByEmail(user: User): Observable<any> {
    return this.http.get<User[]>(this.userUrl + "/users/" + user.login + "/", httpOptions);
  }

  public findById(userId:number): Observable<any> {
    return this.http.get<User>(this.userUrl + "/user/" + userId, httpOptions);
  }

  public deleteById(user) {
    return this.http.delete(this.userUrl + "/deleteUser/" + user.userId, httpOptions);
  }

  public openModal(name: String) {
    this.dialog.open(ComfirmComponent, { data: { name } })
  }

  public insert(user: any, users: any) {
      return this.http.post<User>(this.userUrl + "/registration", user, httpOptions);
  }

  public validToken(token: String): Observable<any>{
    return this.http.get<String>(this.userUrl + "/registrationConfirm?token=" + token, httpOptions);
  }


  public findToken (username: any): Observable<any>{
    return this.http.get<String>(this.userUrl + "/user/findToken?username=" + username, httpOptions);
  }

  public resendToken(email: String): Observable<any>{
    return this.http.post<String>(this.userUrl + "/user/resendRegistrationToken?email="+ email, httpOptions);
  }
}
