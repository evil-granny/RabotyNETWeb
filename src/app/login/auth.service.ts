import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable( { providedIn: 'root' } )
export class AuthService {

  authenticated = false;

  constructor(private http: HttpClient) {
  }

  public authenticate(credentials) {

    const authHeader = credentials ? {
      // 'Authorization' : 'Basic ' + btoa(credentials.username + ':' + credentials.password),
      'Authorization' : 'Basic YWRtaW46YWRtaW4=',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    } : {};
    console.log('AUTH_HEADER');
    console.log(authHeader);
    const headers = new HttpHeaders(authHeader);

    const httpOptions = {
      headers: new HttpHeaders(authHeader)
    };

    return this.http.post('http://localhost:8080/logedUser', credentials, httpOptions);
  }

}
