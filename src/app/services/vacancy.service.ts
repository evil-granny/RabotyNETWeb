import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Vacancy} from '../models/vacancy.model';
import {Observable} from 'rxjs';
import { Requirement } from '../models/requirement.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  constructor(private http: HttpClient) {
  }

  private vacancyUrl = 'http://localhost:8080/vacancies';

  public findAll(): Observable<any> {
    return this.http.get(this.vacancyUrl , httpOptions);
  }

  public findVacanciesByCompanyId(companyId : any, first : number, count : number): Observable<any> {
    return this.http.get(this.vacancyUrl + '/byCompanyId/' + companyId + "/" + first + "/" + count, httpOptions);
  }

  public findAllWothPagination(first: number, count: number) : Observable<any> {
    return this.http.get(this.vacancyUrl +"/all/"+first+"/"+count);
  }

  get(vacancyId: string) {
    return this.http.get<Vacancy>(this.vacancyUrl + '/' + vacancyId, httpOptions);
  }

  getCountOfVacancies(companyId: any) {
    return this.http.get<number>(this.vacancyUrl + '/count/' + companyId, httpOptions);
  }

  getCountOfAllVacancies() {
    return this.http.get<number>(this.vacancyUrl + '/countAll/', httpOptions);
  }

  public deleteById(id: number): Observable<Object> {
    return this.http.delete(this.vacancyUrl + '/' + id, httpOptions);
  }

  public update(vacancy: any): Observable<Vacancy> {
    return this.http.put<Vacancy>(this.vacancyUrl , vacancy, httpOptions);
  }

  public createVacancy(vacancy: Vacancy, companyId : string): Observable<Object> {
    return this.http.post<Vacancy>(this.vacancyUrl + '/createVacancy/' + companyId, vacancy, httpOptions);
  }
  public updateRequirement(requirement: any): Observable<Requirement> {
    return this.http.put<Requirement>(this.vacancyUrl + '/updateRequirement', requirement , httpOptions);
  }


}
