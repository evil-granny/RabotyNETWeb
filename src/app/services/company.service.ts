import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Company } from "../models/company.model";

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

  private companyURL = 'http://localhost:8080';

  public findAll() {
    console.log("[find all companies]");
    return this.http.get<Company[]>(this.companyURL + "/companies");
  }

  public deleteById(company) {
    console.log("[delete company]");
    return this.http.delete(this.companyURL + "/deleteCompany/" + company.companyId, httpOptions);
  }

  public create(company) {
    console.log("[create company]");
    return this.http.post<Company>(this.companyURL + "/createCompany", company, httpOptions);
  }

  public update(company) {
    console.log("[update company]");
    return this.http.put<Company>(this.companyURL + "/updateCompany", company, httpOptions);
  }

  public findById(companyId) {
    console.log("[find by id]");
    return this.http.get<Company>(this.companyURL + "/company/" + companyId, httpOptions);
  }

  public static validateCompany(company) {
    return company.name.length > 0 && company.name.length <= 30 &&
      company.edrpou.length > 0 && company.edrpou.length <= 30 &&
      company.description.length < 30 &&
      company.website.length > 0 && company.website.length <= 30 &&
      this.validateAddress(company.address) &&
      this.validateContacts(company.contacts);
  }

  private static validateAddress(address) {
    return address.country.length > 0 && address.country.length <= 20 &&
      address.city.length > 0 && address.city.length <= 15 &&
      address.street.length <= 30 &&
      address.building.length <= 5 &&
      address.apartment.length <= 5 &&
      address.zipCode > 0;
  }

  private static validateContacts(contacts) {
    return contacts.email.length <= 50 &&
      contacts.phoneNumber.length <= 15;
  }

}