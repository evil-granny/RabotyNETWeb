import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Requirement } from '../models/requirement.model';
import { VacancyDTO } from '../models/vacancy/vacancyDTO.model';
import { Resume } from '../models/resume.model';
import { Vacancy } from '../models/vacancy/vacancy.model';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private vacancyUrl = this.rabotyNETEndpoint.apiEndpoint + '/vacancies';
  private requirementUrl = this.rabotyNETEndpoint.apiEndpoint + '/requirements';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.rabotyNETEndpoint.allowOrigin,
      'Access-Control-Allow-Credentials': 'true',
    }), withCredentials: true
  };

  public findAll(): Observable<any> {
    return this.http.get(this.vacancyUrl, this.httpOptions);
  }

  public findVacanciesByCompanyId(companyId: string, first: number): Observable<any> {
    return this.http.get<VacancyDTO>(this.vacancyUrl + '/' + companyId + "/" + first, this.httpOptions);
  }

  public findAllWithPagination(first: number, userId: any): Observable<any> {
    return this.http.get<VacancyDTO>(this.vacancyUrl + "/findAll/" + first + "/" + userId, this.httpOptions);
  }

  public findAllHotVacanciesWithPagination(first: number): Observable<any> {
    return this.http.get<VacancyDTO>(this.vacancyUrl + "/hotVacancies/" + first, this.httpOptions);
  }

  public findAllClosedVacanciesWithPagination(first: number): Observable<any> {
    return this.http.get<VacancyDTO>(this.vacancyUrl + "/closedVacancies/" + first, this.httpOptions);
  }

  get(vacancyId: string) {
    return this.http.get<Vacancy>(this.vacancyUrl + '/' + vacancyId, this.httpOptions);
  }

  public deleteById(id: any) {
    return this.http.delete(this.vacancyUrl + '/' + id, this.httpOptions);
  }

  public deleteRequirementById(id: BigInteger) {
    return this.http.delete(this.requirementUrl + '/' + id, this.httpOptions);
  }

  public update(vacancy: any): Observable<Vacancy> {
    return this.http.put<Vacancy>(this.vacancyUrl, vacancy, this.httpOptions);
  }

  public createVacancy(vacancy: Vacancy, companyId: any): Observable<Object> {
    return this.http.post<Vacancy>(this.vacancyUrl + '/createVacancy/' + companyId, vacancy, this.httpOptions);
  }
  public updateRequirement(requirement: any): Observable<Requirement> {
    return this.http.put<Requirement>(this.vacancyUrl + '/updateRequirement', requirement, this.httpOptions);
  }

  public sendResume(resume: Resume, vacancyId: any): Observable<Resume> {
    return this.http.post<Resume>(this.vacancyUrl + '/sendResume/' + vacancyId, resume, this.httpOptions);
  }

}
