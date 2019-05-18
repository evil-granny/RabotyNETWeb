import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SearchCVResponse} from '../models/SearchModel/SearchCVResponse.model';
import {SearchVacancyResponse} from '../models/SearchModel/SearchVacancyResponse.model';
import {SearchVacancyComponent} from '../search-vacancy/search-vacancy.component';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  private searchUrl = 'http://localhost:8080';

  public getCVResult(searchCV) {
    console.log('[Start Searching]');
    return this.http.post<SearchCVResponse>(this.searchUrl + '/searchCV', searchCV, httpOptions);
  }

  public getVacancyResult(searchVacancy) {
    console.log('[Start Searching]');
    return this.http.post<SearchVacancyResponse>(this.searchUrl + '/vacancies/search', searchVacancy, httpOptions);
  }

}
