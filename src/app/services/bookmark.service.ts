import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Requirement } from '../models/requirement.model';
import { VacancyDTO } from '../models/vacancy/vacancyDTO.model';
import { Resume } from '../models/resume.model';
import { Vacancy } from '../models/vacancy/vacancy.model';

import { Observable } from 'rxjs';

import { APP_CONFIG, IAppConfig } from '../app.config';
import {numbers} from '@material/dialog/constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  }), withCredentials: true
};
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private bookmarkUrl = this.rabotyNETEndpoint.apiEndpoint + '/bookmarks';
  private allowOrigin = httpOptions.headers.append('Access-Control-Allow-Origin', this.rabotyNETEndpoint.allowOrigin);

  public findAll(): Observable<any> {
    return this.http.get(this.bookmarkUrl, httpOptions);
  }

  public getBookmarksByUserIdWithPagination(userId: any, first: number): Observable<any> {
    return this.http.get<VacancyDTO>(this.bookmarkUrl + '/findBookmarks/' + userId + "/" + first, httpOptions);
  }

  public deleteVacancyFromBookmark(vacancyId: any, userId: any): Observable<Object> {
    return this.http.put<number>(this.bookmarkUrl + '/deleteBookmark/' + vacancyId, userId, httpOptions);
  }

  public addVacancyToBookmark(vacancyId: any, userId: any): Observable<Object> {
    return this.http.post<number>(this.bookmarkUrl + '/createBookmark/' + vacancyId, userId, httpOptions);
  }

}
