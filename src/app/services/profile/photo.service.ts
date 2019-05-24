import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Photo } from 'src/app/models/photo.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:4200',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  private photoUrl = "http://localhost:8080/photo/";

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

  public load(photoId: BigInteger): Observable<Photo> {
    return this.http.get<Photo>(this.photoUrl + photoId, httpOptions);
  }

}
