import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SearchResumeResponse} from '../models/SearchModel/SearchResumeResponse.model';
import {SearchVacancyResponse} from '../models/SearchModel/SearchVacancyResponse.model';
import {APP_CONFIG, IAppConfig} from '../app.config';

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

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private searchUrl = this.rabotyNETEndpoint.apiEndpoint;

  public getResumeResult(searchResume) {
    return this.http.post<SearchResumeResponse>(this.searchUrl + '/searchResume', searchResume, httpOptions);
  }

  public getVacancyResult(searchVacancy) {
    return this.http.post<SearchVacancyResponse>(this.searchUrl + '/searchVacancy', searchVacancy, httpOptions);
  }

}
