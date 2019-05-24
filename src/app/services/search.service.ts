import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SearchCVResponse} from '../models/SearchModel/SearchCVResponse.model';
import {SearchVacancyResponse} from '../models/SearchModel/SearchVacancyResponse.model';

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
export class SearchService {

  constructor(private http: HttpClient) { }

  private searchUrl = 'http://localhost:8080';

  public getCVResult(searchCV) {
    return this.http.post<SearchCVResponse>(this.searchUrl + '/searchCV', searchCV, httpOptions);
  }

  public getVacancyResult(searchVacancy) {
    return this.http.post<SearchVacancyResponse>(this.searchUrl + '/vacancies/search', searchVacancy, httpOptions);
  }

}
