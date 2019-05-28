import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Resume } from '../models/resume.model';
import { ResumeService } from './resume.service';





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
  
  constructor(private http: HttpClient) { }

  private resumeURL = 'http://localhost:8080';

  public findById(cvId) {
    return this.http.get<Resume>(this.resumeURL + "/pdf/" + cvId, httpOptions);
  }

  public update(cv) {
    return this.http.put<Resume>(this.resumeURL + "/pdf/updatePDF", cv, httpOptions);
  }

  public show(cvId, send) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.resumeURL + "/pdf/createPdf/" + cvId + "&" + send,{ headers: headers, responseType: 'arraybuffer'});
  }

  

  
}


