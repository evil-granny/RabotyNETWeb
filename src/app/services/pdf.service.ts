import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CV } from '../models/cv.model';
import { CVService } from './cv.service';





const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})

export class PdfService {
  
  constructor(private http: HttpClient) { }

  private cvURL = 'http://localhost:8080';

  public findById(cvId) {
    return this.http.get<CV>(this.cvURL + "/pdf/" + cvId, httpOptions);
  }

  public update(cv) {
    return this.http.put<CV>(this.cvURL + "/pdf/updatePDF", cv, httpOptions);
  }

  public show(cvId, send) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');    
    return this.http.get(this.cvURL + "/pdf/createPdf/" + cvId + "&" + send,{ headers: headers, responseType: 'arraybuffer'});
  }

  

  
}


