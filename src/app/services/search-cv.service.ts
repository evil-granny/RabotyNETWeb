import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SearchCVResult} from '../models/SearchModel/searchCVResult.model';
import {SearchCVResponse} from '../models/SearchModel/SearchCVResponse.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class SearchCVService {

  constructor(private http: HttpClient) { }

  private searchCVUrl = 'http://localhost:8080';

  public getResult(searchCV) {
    console.log('[Start Searching]');
    return this.http.post<SearchCVResponse>(this.searchCVUrl + '/searchCV', searchCV, httpOptions);
  }

  public nextPage(searchCV) {
    console.log('[Next page]');
    return this.http.post<SearchCVResponse>(this.searchCVUrl + '/searchCV', searchCV, httpOptions);
  }
}
