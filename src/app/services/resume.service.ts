import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Resume } from '../models/resume.model';

import { APP_CONFIG, IAppConfig } from '../app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': new IAppConfig().allowOrigin.toString(),
    'Access-Control-Allow-Credentials': 'true',
  }), withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private resume = this.rabotyNETEndpoint.apiEndpoint + '/resume';

  public findAll() {
    return this.http.get<Resume[]>(this.resume + '/all', httpOptions);
  }

  public deleteById(cv: Resume) {
    return this.http.delete(this.resume + '/delete/' + cv.resumeId, httpOptions);
  }

  public insert(cv: Resume) {
    return this.http.post<Resume>(this.resume + '/create', cv, httpOptions);
  }

  public update(cv: Resume) {
    return this.http.put<Resume>(this.resume + '/update', cv, httpOptions);
  }

  public findById(cvId: any) {
    return this.http.get<Resume>(this.resume + '/' + cvId, httpOptions);
  }

  public findByUserId(userId: any) {
    return this.http.get<Resume>(this.resume + '/user/' + userId, httpOptions);
  }

  public deleteSkillById(id: any) {
    return this.http.delete(this.resume + '/skill/' + id, httpOptions);
  }

  public deleteJobById(id: any) {
    return this.http.delete(this.resume + '/job/' + id, httpOptions);
  }

  public getResumeByVacancyId(id: any) {
    return this.http.get<Resume[]>(this.resume + '/byVacancyId/' + id, httpOptions);
  }

  public exists(userId: any) {
    return this.http.get<boolean>(this.resume + "/existsResume/" + userId, httpOptions);
  }

}
