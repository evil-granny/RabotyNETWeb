import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';
import { Claim } from '../models/claim.model';

@Component({
  selector: 'app-person',
  templateUrl: './company.component.html',
  styleUrls: [ './company.component.css' ]
})
export class CompanyComponent implements OnInit {

  companies: Company[];
  
  filter: string = "all";
  currentClaim: BigInteger = null;

  page: number = 0;
  count: number = 3;
  size: number = 0;

  constructor(private router: Router, private companyService: CompanyService) {}

  ngOnInit() {
    this.companyService.getCompaniesCount()
      .subscribe( data => {
        this.size = data;
      });

    this.findAll();
  };

  findAll() {
    this.companyService.findAllWothPagination(this.page * this.count, this.count)
      .subscribe( data => {
        this.companies = data;

        this.companies.forEach(company => {
          this.companyService.findClaims(company)
            .subscribe( data => {
              company.claims = new Array();
              data.forEach(function(claim) {
                company.claims.push(claim);
              })
            })
        });
      });
  }

  canPrev() : boolean {
    return this.page > 0;
  }

  prev() {
    if(this.canPrev()) {
      this.page = this.page - 1;
      this.findAll();
    }
  }

  canNext() : boolean {
    return (this.page + 1) * this.count < this.size;
  }

  next() {
    if(this.canNext()) {
      this.page = this.page + 1;
      this.findAll();
    }
  }

  deleteById(company: Company): void {
    this.companyService.deleteById(company)
      .subscribe( data => {
        this.companies = this.companies.filter(p => p !== company);
        this.size = this.size - 1;
      })
  };

  approve(company: Company) : void {
    this.companyService.approve(company)
      .subscribe( data => {
        this.companies.find((c) => c.companyId === company.companyId).status.mailSent = true;
      });
  }

  rejectClaim(claim: Claim) : void {
    this.companyService.deleteClaimById(claim)
      .subscribe( data => {
        this.companies.forEach(company => {
          this.companyService.findClaims(company)
            .subscribe( data => {
              company.claims = company.claims.filter(c => c !== claim);
            })
        });     
      });
  }

  isApproved(company: Company) : boolean {
    return company.status == null || company.status.approved;
  }

  isMailSent(company: Company) : boolean {
      return company.status == null || company.status.mailSent;
  }

  isReliable(company: Company) : boolean {
      return company.status == null || company.status.reliable;
  }

  hasClaims(company: Company) : boolean {
      return company.claims != null && company.claims.length > 0;
  }

}
