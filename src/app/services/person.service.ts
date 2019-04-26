import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Person } from '../models/person.model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  userId: any = 1;

  private url = "http://localhost:8080";

  public findById(): Observable<any> {
    return this.http.get<Person>(this.url + "/person/" + this.userId, httpOptions);
  }

  public update(person: Person): Observable<any> {
    return this.http.put<Person>(this.url + "/updatePerson", person, httpOptions);
  }

}
