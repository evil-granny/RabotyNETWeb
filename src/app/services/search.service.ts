import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SearchResumeResponse} from '../models/SearchModel/SearchResumeResponse.model';
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

  public getResumeResult(searchResume) {
    return this.http.post<SearchResumeResponse>(this.searchUrl + '/searchResume', searchResume, httpOptions);
  }

  public getVacancyResult(searchVacancy) {
    return this.http.post<SearchVacancyResponse>(this.searchUrl + '/searchVacancy', searchVacancy, httpOptions);
  }

}
