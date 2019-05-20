import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { isNull } from '@angular/compiler/src/output/output_ast';
import { MatDialog } from '@angular/material';
import { ComfirmComponent } from '../confirm/comfirm.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
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
    console.log("[findAll]");
    return this.http.get<User[]>(this.userUrl + "/users", httpOptions);
  }

  enabledUser(user: User) {
    console.log("[enabledUser]");
    return this.http.get<Boolean>(this.userUrl + "/login/enabled/" + user.login + "/", httpOptions)
  }

  public findByEmail(user: User): Observable<any> {
    console.log("[findByEmail]");
    return this.http.get<User[]>(this.userUrl + "/users/" + user.login + "/", httpOptions);
  }

  public findById(userId:number): Observable<any> {
    console.log("[findById]");
    return this.http.get<User>(this.userUrl + "/user/" + userId, httpOptions);
  }

  public deleteById(user) {
    console.log("[deleteById]");
    return this.http.delete(this.userUrl + "/deleteUser/" + user.userId, httpOptions);
  }

  public openModal(name: String) {
    this.dialog.open(ComfirmComponent, { data: { name } })
  }

  public insert(user: any, users: any) {
      console.log("[insert]");
      this.openModal("User has been created successfully. Confirm your email and login into site!");
      return this.http.post<User>(this.userUrl + "/registration", user, httpOptions);
  }

  public validToken(token: String): Observable<any>{
    console.log("[validToken]");
    return this.http.get<String>(this.userUrl + "/registrationConfirm?token=" + token, httpOptions);
  }

  public resendToken(email: String): Observable<any>{
    console.log("[resendToken]");
    return this.http.post<String>(this.userUrl + "/user/resendRegistrationToken", email, httpOptions);
  }
}
