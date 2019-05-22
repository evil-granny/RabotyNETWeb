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

  public deleteById(cv) {
    return this.http.delete(this.cvUrl + "/deleteCV/" + cv.cvId, httpOptions);
  }

  public insert(cv) {
    return this.http.post<CV>(this.cvUrl + "/createCV", cv, httpOptions);
  }

  public update(cv) {
    return this.http.put<CV>(this.cvUrl + "/updateCV", cv, httpOptions);
  }

  public findById(cvId) {
    console.log("[find cv by id]");
    return this.http.get<CV>(this.companyURL + "/company/" + companyId, httpOptions);
  }
}
