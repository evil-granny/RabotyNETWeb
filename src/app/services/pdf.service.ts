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
    console.log("[find company by id]");
    return this.http.get<CV>(this.cvURL + "/cv/" + cvId, httpOptions);
  }

  public update(cv) {
    console.log("[update company]");
    return this.http.put<CV>(this.cvURL + "/updateCV", cv, httpOptions);
  }
  







}


