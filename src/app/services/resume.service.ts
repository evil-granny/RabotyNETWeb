import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Resume } from '../models/resume.model';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private resume = this.rabotyNETEndpoint.apiEndpoint + '/resume';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.rabotyNETEndpoint.allowOrigin,
      'Access-Control-Allow-Credentials': 'true',
    }), withCredentials: true
  };

  public findAll() {
    return this.http.get<Resume[]>(this.resume + '/all', this.httpOptions);
  }

  public deleteById(resume: Resume) {
    return this.http.delete(this.resume + '/delete/' + resume.resumeId, this.httpOptions);
  }

  public insert(resume: Resume) {
    return this.http.post<Resume>(this.resume + '/create', resume, this.httpOptions);
  }

  public update(resume: Resume) {
    return this.http.put<Resume>(this.resume + '/update', resume, this.httpOptions);
  }

  public findById(resumeId: any) {
    return this.http.get<Resume>(this.resume + '/' + resumeId, this.httpOptions);
  }

  public findByUserId(userId: any) {
    return this.http.get<Resume>(this.resume + '/user/' + userId, this.httpOptions);
  }

  public deleteSkillById(id: any) {
    return this.http.delete(this.resume + '/skill/' + id, this.httpOptions);
  }

  public deleteJobById(id: any) {
    return this.http.delete(this.resume + '/job/' + id, this.httpOptions);
  }

  public getResumeByVacancyId(id: any) {
    return this.http.get<Resume[]>(this.resume + '/byVacancyId/' + id, this.httpOptions);
  }

  public exists(userId: any) {
    return this.http.get<boolean>(this.resume + "/existsResume/" + userId, this.httpOptions);
  }

}
