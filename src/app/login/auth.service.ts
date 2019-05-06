import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable( { providedIn: 'root' } )
export class AuthService {

  authenticated = false;

  private userUrl = 'http://localhost:8080/loggedUser';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';

  constructor(private http: HttpClient) {
  }

  public authenticate(credentials) {

    const authHeader = credentials ? {
      'Authorization' : 'Basic ' + btoa(credentials.username + ':' + credentials.password),
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    } : {};
    console.log('AUTH_HEADER');
    console.log(authHeader);
    const headers = new HttpHeaders(authHeader);

    const httpOptions = {
      headers: new HttpHeaders(authHeader)
    };

    return this.http.post(this.userUrl, credentials, httpOptions);
  }

}
