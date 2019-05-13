import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Company } from "../models/company.model";
import { Claim } from '../models/claim.model';
import { Status } from '../models/status.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
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
    console.log("[find all companies]");
    return this.http.get<Company[]>(this.companyURL);
  }

  public findAllWothPagination(first: number, count: number) {
    console.log("[find all companies by pagination]");
    return this.http.get<Company[]>(this.companyURL + "/" + first + "/" + count);
  }

  public getCompaniesCount() {
    return this.http.get<number>(this.companyURL + "/count");
  }

  public deleteById(company) {
    console.log("[delete company]");
    return this.http.delete(this.companyURL + "/" + company.companyId, httpOptions);
  }

  public create(company) {
    console.log("[create company]");
    return this.http.post<Company>(this.companyURL + "/", company, httpOptions);
  }

  public update(company) {
    console.log("[update company]");
    return this.http.put<Company>(this.companyURL + "/", company, httpOptions);
  }

  public approve(company) {
    console.log("[approve company]");
    return this.http.put<Company>(this.companyURL + "/approve", company, httpOptions);
  }

  // public findById(companyId) {
  //   console.log("[find company by id]");
  //   return this.http.get<Company>(this.companyURL + "/" + companyId, httpOptions);
  // }

  public findByName(companyName) {
    console.log("[find company by name]");
    return this.http.get<Company>(this.companyURL + "/" + companyName, httpOptions);
  }

  public createClaim(claim) {
    console.log("[claim company]");
    return this.http.post<Company>(this.claimURL + "/", claim, httpOptions);
  }

  public findClaims(company) {
    return this.http.get<Claim[]>(this.claimURL + "/" + company.companyId, httpOptions);
  }

  public deleteClaimById(claim) {
    return this.http.delete(this.claimURL + "/" + claim.claimId, httpOptions);
  }
}
