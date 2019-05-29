import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Person } from './../../models/person.model';
import { Observable } from 'rxjs';
import {APP_CONFIG, IAppConfig} from '../../app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Credentials': 'true',
  }), withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private url = this.rabotyNETEndpoint.apiEndpoint + '/people/';

  public findById(userId: BigInteger): Observable<Person> {
    return this.http.get<Person>(this.url + userId, httpOptions);
  }

  public update(person: Person): Observable<Person> {
    return this.http.put<Person>(this.url, person, httpOptions);
  }

}
