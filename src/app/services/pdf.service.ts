import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CV } from '../models/cv.model';





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
    console.log("[find cv by id]");
    return this.http.get<CV>(this.cvURL + "/pdf/" + cvId, httpOptions);
  }

  public update(cv) {
    console.log("[update cv]");
    return this.http.put<CV>(this.cvURL + "/updatePDF", cv, httpOptions);
  }

  public show() {
    console.log("[update cv]");
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');    
    return this.http.get(this.cvURL + "/createPdf",{ headers: headers, responseType: 'arraybuffer'});
  }

  

  
}


