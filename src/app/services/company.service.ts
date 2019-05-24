import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Company } from "../models/CompanyModel/company.model";
import { Claim } from '../models/claim.model';
import { CompanyPaginationDTO } from '../models/CompanyModel/companyPaginationDTO.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
  })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  private companyURL = 'http://localhost:8080/companies';
  private claimURL = 'http://localhost:8080/claims';

  public findAll() {
    return this.http.get<Company[]>(this.companyURL + "/all");
  }

  public findAllWothPagination(first: number, count: number) {
    return this.http.get<CompanyPaginationDTO>(this.companyURL + "/all/" + first + "/" + count);
  }

  public findAllByUser() {
    return this.http.get<Company[]>(this.companyURL + "/my");
  }

  public deleteById(company) {
    return this.http.delete(this.companyURL + "/delete/" + company.companyId, httpOptions);
  }

  public create(company) {
    return this.http.post<Company>(this.companyURL + "/create", company, httpOptions);
  }

  public update(company) {
    return this.http.put<Company>(this.companyURL + "/update", company, httpOptions);
  }

  public sendMail(company) {
    return this.http.put<Company>(this.companyURL + "/sendMail", company, httpOptions);
  }

  public approve(company, token) {
    return this.http.put<Company>(this.companyURL + "/approve/" + token, company, httpOptions);
  }

  public findByName(companyName) {
    return this.http.get<Company>(this.companyURL + "/byName/" + companyName, httpOptions);
  }

  public exists(companyName) {
    return this.http.get<boolean>(this.companyURL + "/exists/" + companyName, httpOptions);
  }

  public createClaim(claim) {
    return this.http.post<Company>(this.claimURL + "/create", claim, httpOptions);
  }

  public findClaims(company) {
    return this.http.get<Claim[]>(this.claimURL + "/byCompany/" + company.companyId, httpOptions);
  }

  public deleteClaimById(claim) {
    return this.http.delete(this.claimURL + "/delete/" + claim.claimId, httpOptions);
  }
}
