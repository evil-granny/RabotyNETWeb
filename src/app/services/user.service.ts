import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from "../models/user.model";
import { Observable } from "rxjs";

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

  constructor(private http: HttpClient) { }

  private userUrl = 'http://localhost:8080';

  public findAll(): Observable<any> {
    console.log("[findAll]");
    return this.http.get<User[]>(this.userUrl + "/users", httpOptions);
  }

  public deleteById(user) {
    console.log("[deleteById]");
    return this.http.delete(this.userUrl + "/deleteUser/" + user.userId, httpOptions);
  }

  public insert(user) {
    console.log("[insert]");
    console.log(user);
    return this.http.post<User>(this.userUrl + "/registration", user, httpOptions);
  }

}
