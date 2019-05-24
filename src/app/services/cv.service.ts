import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CV } from "../models/cv.model";

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
export class CVService {

  constructor(private http: HttpClient) { }

  private cvUrl = 'http://localhost:8080/resume';

  public findAll() {
    return this.http.get<CV[]>(this.cvUrl + "/all", httpOptions);
  }

  public deleteById(cv: CV) {
    return this.http.delete(this.cvUrl + "/delete/" + cv.cvId, httpOptions);
  }

  public insert(cv: CV) {
    return this.http.post<CV>(this.cvUrl + "/create", cv, httpOptions);
  }

  public update(cv: CV) {
    return this.http.put<CV>(this.cvUrl + "/update", cv, httpOptions);
  }

  public findById(cvId: any) {
    return this.http.get<CV>(this.cvUrl + "/" + cvId, httpOptions);
  }

  public findByUserId() {
    return this.http.get<CV>(this.cvUrl + "/user", httpOptions);
  }

  public deleteSkillById(id: any) {
    return this.http.delete(this.cvUrl + '/skill/' + id, httpOptions);
  }

  public deleteJobById(id: any) {
    return this.http.delete(this.cvUrl + '/job/' + id, httpOptions);
  }

}
