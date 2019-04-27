import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Vacancy } from "../models/vacancy.model";
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
export class VacancyService {

  constructor(private http: HttpClient) {}

  private vacancyUrl = 'http://localhost:8080';
  private vacancyAPI = this.vacancyUrl+'/vacancy';

  public findAll(): Observable<any> {
    return this.http.get(this.vacancyUrl + "/vacancies", httpOptions);
  }
  
  get(vacancyId : string)   {
    return this.http.get<Vacancy>(this.vacancyAPI + '/' + vacancyId, httpOptions);
  }

  public deleteById(id:number): Observable<Object> {
    return this.http.delete(this.vacancyUrl + "/deleteVacancy/" + id, httpOptions);
  }

  // public save(vacancy: any): Observable<any> {
  //   let result: Observable<Object>;
  //   if (vacancy['id']) {
  //     result = this.http.put<Vacancy>(this.vacancyAPI,vacancy.id, vacancy);
  //   } else {
  //     result = this.http.post<Vacancy>(this.vacancyUrl+ '/createVacancy'+1, vacancy);
  //   }
  //   return result;
  // }
  public update(vacancy : Vacancy) {
    return this.http.put<Vacancy>(this.vacancyUrl + "/updateVacancy", vacancy, httpOptions);
  }

  
   public create(vacancy : Vacancy) : Observable<Object>{
     return this.http.post<Vacancy>(this.vacancyUrl + "/createVacancy/"+1, vacancy, httpOptions);
   }

}
