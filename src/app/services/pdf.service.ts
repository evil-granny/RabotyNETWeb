import {Inject, Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Resume } from '../models/resume.model';
import { ResumeService } from './resume.service';
import {APP_CONFIG, IAppConfig} from '../app.config';
import { ResumeComponent } from '../resume/resume.component';





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

export class PdfService {
  
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private resumeURL = this.rabotyNETEndpoint.apiEndpoint;

  public findById(resumeId) {
    return this.http.get<Resume>(this.resumeURL + "/pdf/" + resumeId, httpOptions);
  }

  public findByUserId() {
    return this.http.get<Resume>(this.resumeURL + "/pdf", httpOptions);
  }

  public send() {
    return this.http.get(this.resumeURL + "/pdf/sendEmail", httpOptions);
  }

  public update(resume) {
    return this.http.put<Resume>(this.resumeURL + "/pdf/updatePDF", resume, httpOptions);
  }

  public show(resumeId, send) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.resumeURL + "/pdf/createPdf/" + resumeId + "&" + send,{ headers: headers, responseType: 'arraybuffer'});
  }

  

  
}


