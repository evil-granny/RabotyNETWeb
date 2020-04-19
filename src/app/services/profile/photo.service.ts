import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Photo } from '../../models/photo.model';

import { Observable } from 'rxjs';

import { APP_CONFIG, IAppConfig } from '../../app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Credentials': 'true',
  }), withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private photoUrl = this.rabotyNETEndpoint.apiEndpoint + '/photo/';
  private allowOrigin = httpOptions.headers.append('Access-Control-Allow-Origin', this.rabotyNETEndpoint.allowOrigin);

  public uploadAvatar(file: File, userId: BigInteger): Observable<Photo> {
    let body = new FormData();
    body.append("file", file);

    return this.http.post<Photo>(this.photoUrl + "avatars/" + userId, body, httpOptions);
  }

  public uploadLogo(file: File, companyName: string): Observable<Photo> {
    let body = new FormData();
    body.append("file", file);

    return this.http.post<Photo>(this.photoUrl + "logos/" + companyName, body, httpOptions);
  }

  public loadAvatar(photoId: BigInteger): Observable<BinaryType> {
    return this.http.get<BinaryType>(this.photoUrl + "avatars/" + photoId, httpOptions);
  }

  public loadLogo(photoId: BigInteger): Observable<BinaryType> {
    return this.http.get<BinaryType>(this.photoUrl + "logos/" + photoId, httpOptions);
  }

}
