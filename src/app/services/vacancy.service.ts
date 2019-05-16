import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Vacancy} from '../models/vacancy/vacancy.model';
import {Observable} from 'rxjs';
import { Requirement } from '../models/requirement.model';
import {SearchCVResponse} from '../models/SearchModel/SearchCVResponse.model';
import {SearchVacancyComponent} from '../search-vacancy/search-vacancy.component';
import { VacancyDTO } from '../models/vacancy/vacancyDTO.model';

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

  public findVacanciesByCompanyName(companyName : any, first : number, count : number): Observable<any> {
    return this.http.get<VacancyDTO>(this.vacancyUrl + '/' + companyName + "/" + first + "/" + count, httpOptions);
  }

  public findAllWithPagination(first: number, count: number) : Observable<any> {
    return this.http.get<VacancyDTO>(this.vacancyUrl + "/" + first+ "/" + count, httpOptions);
  }

  public findAllHotVacanciesWithPagination(first: number, count: number) : Observable<any> {
    return this.http.get<VacancyDTO>(this.vacancyUrl + "/hotVacancies/" + first+ "/" + count, httpOptions);
  }

  get(vacancyId: string) {
    return this.http.get<Vacancy>(this.vacancyUrl + '/' + vacancyId, httpOptions);
  }

  public deleteById(id: number): Observable<Object> {
    return this.http.delete(this.vacancyUrl + '/' + id, httpOptions);
  }

  public update(vacancy: any): Observable<Vacancy> {
    return this.http.put<Vacancy>(this.vacancyUrl , vacancy, httpOptions);
  }

  public createVacancy(vacancy: Vacancy, companyName : string): Observable<Object> {
    return this.http.post<Vacancy>(this.vacancyUrl + '/createVacancy/' + companyName, vacancy, httpOptions);
  }
  public updateRequirement(requirement: any): Observable<Requirement> {
    return this.http.put<Requirement>(this.vacancyUrl + '/updateRequirement', requirement , httpOptions);
  }

}
