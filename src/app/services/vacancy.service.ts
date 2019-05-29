import { APP_CONFIG, IAppConfig } from '../app.config';
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Vacancy} from '../models/vacancy/vacancy.model';
import { Observable} from 'rxjs';
import { Vacancy } from '../models/vacancy/vacancy.model';
import { Observable } from 'rxjs';
import { Requirement } from '../models/requirement.model';
import { VacancyDTO } from '../models/vacancy/vacancyDTO.model';
import { Resume } from '../models/resume.model';

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
export class VacancyService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) {
  }

  private vacancyUrl = this.rabotyNETEndpoint.apiEndpoint + `/vacancies`;
  private requirementUrl = this.rabotyNETEndpoint.apiEndpoint + '/requirements';

  public findAll(): Observable<any> {
    return this.http.get(this.vacancyUrl , httpOptions);
  }

  public findVacanciesByCompanyId(companyId : string, first : number): Observable<any> {
    return this.http.get<VacancyDTO>(this.vacancyUrl + '/' + companyId + "/" + first , httpOptions);
  }

  public findAllWithPagination(first: number) : Observable<any> {
    return this.http.get<VacancyDTO>(this.vacancyUrl + "/findAll/" + first, httpOptions);
  }

  public findAllHotVacanciesWithPagination(first: number) : Observable<any> {
    return this.http.get<VacancyDTO>(this.vacancyUrl + "/hotVacancies/" + first, httpOptions);
  }

  public findAllClosedVacanciesWithPagination(first: number): Observable<any> {
    return this.http.get<VacancyDTO>(this.vacancyUrl + "/closedVacancies/" + first, httpOptions);
  }

  get(vacancyId: string) {
    return this.http.get<Vacancy>(this.vacancyUrl + '/' + vacancyId, httpOptions);
  }

  public deleteById(id: any) {
    return this.http.delete(this.vacancyUrl + '/' + id, httpOptions);
  }

  public deleteRequiremnetById(id: any) {
    return this.http.delete(this.requirementUrl + '/' + id, httpOptions);
  }

  public update(vacancy: any): Observable<Vacancy> {
    return this.http.put<Vacancy>(this.vacancyUrl , vacancy, httpOptions);
  }

  public createVacancy(vacancy: Vacancy, companyId : any): Observable<Object> {
    return this.http.post<Vacancy>(this.vacancyUrl + '/createVacancy/' + companyId, vacancy, httpOptions);
  }
  public updateRequirement(requirement: any): Observable<Requirement> {
    return this.http.put<Requirement>(this.vacancyUrl + '/updateRequirement', requirement , httpOptions);
  }

  public sendResume(resume:Resume,vacancyId:Uint8Array) : Observable<Resume>{
    return this.http.post<Resume>(this.vacancyUrl + '/sendResume/'+vacancyId, resume, httpOptions);
  }


}
