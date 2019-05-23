import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CV } from "../models/cv.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CVService {

  constructor(private http: HttpClient) { }

  private cvUrl = 'http://localhost:8080';

  public findAll() {
    return this.http.get<CV[]>(this.cvUrl + "/cvs", httpOptions);
  }

  public deleteById(cv: CV) {
    return this.http.delete(this.cvUrl + "/deleteCV/" + cv.cvId, httpOptions);
  }

  public insert(cv: CV) {
    return this.http.post<CV>(this.cvUrl + "/createCV", cv, httpOptions);
  }

  public update(cv: CV) {
    return this.http.put<CV>(this.cvUrl + "/updateCV", cv, httpOptions);
  }

  public findById(cvId: any) {
    return this.http.get<CV>(this.cvUrl + "/cv/" + cvId, httpOptions);
  }

  public findByUserId() {
    return this.http.get<CV>(this.cvUrl + "/userCV", httpOptions);
  }

  public deleteSkillById(id: any) {
    return this.http.delete(this.cvUrl + '/skill/' + id, httpOptions);
  }

  public deleteJobById(id: any) {
    return this.http.delete(this.cvUrl + '/job/' + id, httpOptions);
  }

}
