import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Company } from "../models/company/company.model";
import { Claim } from '../models/claim.model';
import { CompanyPaginationDTO } from '../models/company/companyPaginationDTO.model';

import { APP_CONFIG, IAppConfig } from '../app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': new IAppConfig().allowOrigin,
    'Access-Control-Allow-Credentials': 'true',
  }), withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  private companyURL = this.rabotyNETEndpoint.apiEndpoint + '/companies';
  private claimURL = this.rabotyNETEndpoint.apiEndpoint + '/claims';

  public findAll() {
    return this.http.get<Company[]>(this.companyURL + "/all");
  }

  public findAllWithPagination(first: number, count: number) {
    return this.http.get<CompanyPaginationDTO>(this.companyURL + "/all/" + first + "/" + count);
  }

  public findAllByUser() {
    return this.http.get<Company[]>(this.companyURL + "/my");
  }

  public deleteById(company: any) {
    return this.http.delete(this.companyURL + "/delete/" + company.companyId, httpOptions);
  }

  public create(company: any) {
    return this.http.post<Company>(this.companyURL + "/create", company, httpOptions);
  }

  public update(company: any) {
    return this.http.put<Company>(this.companyURL + "/update", company, httpOptions);
  }

  public sendMail(company: any) {
    return this.http.put<Company>(this.companyURL + "/sendMail", company, httpOptions);
  }

  public approve(company: any, token: any) {
    return this.http.put<Company>(this.companyURL + "/approve/" + token, company, httpOptions);
  }

  public findByName(companyName: any) {
    return this.http.get<Company>(this.companyURL + "/byName/" + companyName, httpOptions);
  }

  public exists(companyName: any) {
    return this.http.get<boolean>(this.companyURL + "/exists/" + companyName, httpOptions);
  }

  public createClaim(claim: any) {
    return this.http.post<Company>(this.claimURL + "/create", claim, httpOptions);
  }

  public findClaims(company: any) {
    return this.http.get<Claim[]>(this.claimURL + "/byCompany/" + company.companyId, httpOptions);
  }

  public deleteClaimById(claim: any) {
    return this.http.delete(this.claimURL + "/delete/" + claim.claimId, httpOptions);
  }

  public getCompanyByVacanycId(id: any) {
    return this.http.get<Company>(this.companyURL + "/byVacancyId/" + id, httpOptions);
  }

  public findById(companyId: any) {
    return this.http.get<Company>(this.companyURL + "/byId/" + companyId, httpOptions);
  }

}
