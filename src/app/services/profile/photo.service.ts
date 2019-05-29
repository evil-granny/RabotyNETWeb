import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Photo } from 'src/app/models/photo.model';
import {APP_CONFIG, IAppConfig} from '../../app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Credentials': 'true',
  }), withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private photoUrl = this.rabotyNETEndpoint.apiEndpoint + '/photo/';

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

  public load(photoId: BigInteger): Observable<BinaryType> {
    return this.http.get<BinaryType>(this.photoUrl + photoId, httpOptions);
  }

}
