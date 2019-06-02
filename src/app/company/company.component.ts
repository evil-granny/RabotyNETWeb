import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../models/company/company.model';
import { Claim } from '../models/claim.model';

import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-person',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companies: Company[];

  filter: string = "all";
  currentClaim: BigInteger = null;

  page: number = 0;
  count: number = 3;
  size: number = 0;

  constructor(private router: Router, private companyService: CompanyService) { }

  ngOnInit() {
    this.findAll();
  };

  findAll() {
    this.companyService.findAllWothPagination(this.page * this.count, this.count)
      .subscribe(data => {
        this.companies = data.companies;
        this.size = data.count;

        this.companies.forEach(company => {
          this.companyService.findClaims(company)
            .subscribe(data => {
              company.claims = new Array();
              data.forEach(function (claim) {
                company.claims.push(claim);
              })
            })
        });
      });
  }

  canPrev(): boolean {
    return this.page > 0;
  }

  prev() {
    if (this.canPrev()) {
      this.page = this.page - 1;
      this.findAll();
    }
  }

  canNext(): boolean {
    return (this.page + 1) * this.count < this.size;
  }

  next() {
    if (this.canNext()) {
      this.page = this.page + 1;
      this.findAll();
    }
  }

  deleteById(company: Company): void {
    this.companyService.deleteById(company)
      .subscribe(() => {
        this.companies = this.companies.filter(p => p !== company);
        this.size = this.size - 1;
      });
  };

  approve(company: Company): void {
    this.companyService.sendMail(company)
      .subscribe(() => {
        this.companies.find((c) => c.companyId === company.companyId).status = 'MAIL_SENT';
      });
  }

  rejectClaim(claim: Claim): void {
    this.companyService.deleteClaimById(claim)
      .subscribe(() => {
        this.companies.forEach(company => {
          this.companyService.findClaims(company)
            .subscribe(() => {
              company.claims = company.claims.filter(c => c !== claim);
            });
        });
      });
  }

  isApproved(company: Company): boolean {
    return company.status == 'APPROVED';
  }

  isMailSent(company: Company): boolean {
    return company.status == 'MAIL_SENT';
  }

  isBlocked(company: Company): boolean {
    return company.status == 'BLOCKED';
  }

  hasClaims(company: Company): boolean {
    return company.claims != null && company.claims.length > 0;
  }

  block(company: Company) {
    if (company.status == 'BLOCKED')
      company.status = 'APPROVED';
    else
      company.status = 'BLOCKED';
    this.companyService.update(company)
      .subscribe(data => {
        this.companies.find((c) => c.companyId === company.companyId).status = data.status;
      });
  }

}
