import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SearchResumeResponse } from '../models/search/SearchResumeResponse.model';
import { SearchVacancyResponse } from '../models/search/SearchVacancyResponse.model';

import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private searchUrl = this.rabotyNETEndpoint.apiEndpoint;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.rabotyNETEndpoint.allowOrigin,
      'Access-Control-Allow-Credentials': 'true',
    }), withCredentials: true
  };

  public getResumeResult(searchResume: any) {
    return this.http.post<SearchResumeResponse>(this.searchUrl + '/searchResume', searchResume, this.httpOptions);
  }

  public getVacancyResult(searchVacancy: any) {
    return this.http.post<SearchVacancyResponse>(this.searchUrl + '/searchVacancy', searchVacancy, this.httpOptions);
  }

}
