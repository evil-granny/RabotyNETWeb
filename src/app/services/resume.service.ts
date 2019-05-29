import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Resume } from '../models/resume.model';
import { Person } from '../models/person.model';

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
export class ResumeService {

  constructor(private http: HttpClient) { }

  private cvUrl = 'http://localhost:8080/resume';

  public findAll() {
    return this.http.get<Resume[]>(this.cvUrl + '/all', httpOptions);
  }

  public deleteById(cv: Resume) {
    return this.http.delete(this.cvUrl + '/delete/' + cv.resumeId, httpOptions);
  }

  public insert(cv: Resume) {
    return this.http.post<Resume>(this.cvUrl + '/create', cv, httpOptions);
  }

  public update(cv: Resume) {
    return this.http.put<Resume>(this.cvUrl + '/update', cv, httpOptions);
  }

  public findById(cvId: any) {
    return this.http.get<Resume>(this.cvUrl + '/' + cvId, httpOptions);
  }

  public findByUserId() {
    return this.http.get<Resume>(this.cvUrl + '/user', httpOptions);
  }

  public deleteSkillById(id: any) {
    return this.http.delete(this.cvUrl + '/skill/' + id, httpOptions);
  }

  public deleteJobById(id: any) {
    return this.http.delete(this.cvUrl + '/job/' + id, httpOptions);
  }

  public getResumeByVacancyId(id: any) {
    return this.http.get<Resume[]>(this.cvUrl + '/byVacancyId/' + id, httpOptions);
  }

}
