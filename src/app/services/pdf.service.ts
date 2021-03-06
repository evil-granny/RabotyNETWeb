import { Inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Resume } from '../models/resume.model';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private resumeURL = this.rabotyNETEndpoint.apiEndpoint;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.rabotyNETEndpoint.allowOrigin,
      'Access-Control-Allow-Credentials': 'true',
    }), withCredentials: true
  };

  public findById(resumeId: any) {
    return this.http.get<Resume>(this.resumeURL + "/pdf/" + resumeId, this.httpOptions);
  }

  public findByUserId() {
    return this.http.get<Resume>(this.resumeURL + "/pdf", this.httpOptions);
  }

  public send() {
    return this.http.get(this.resumeURL + "/pdf/sendEmail", this.httpOptions);
  }

  public update(resume: any) {
    return this.http.put<Resume>(this.resumeURL + "/pdf/updatePDF", resume, this.httpOptions);
  }

  public show(resumeId: any, send: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.resumeURL + "/pdf/createPdf/" + resumeId + "&" + send, { headers: headers, responseType: 'arraybuffer' });
  }

}
