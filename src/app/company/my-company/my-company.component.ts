import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/CompanyModel/company.model';
import { Claim } from 'src/app/models/claim.model';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent implements OnInit {

  companies: Company[];

  flag:boolean = true;
  
  filter: string = "all";
  currentClaim: BigInteger = null;

  constructor(private router: Router, private companyService: CompanyService) {}

  ngOnInit() {
    this.findAll();
  };

  findAll() {
    this.companyService.findAllByUser()
      .subscribe( data => {
        this.companies = data;

        this.companies.forEach(company => {
          this.companyService.findClaims(company)
            .subscribe( data => {
              company.claims = new Array();
              data.forEach(function(claim) {
                company.claims.push(claim);
              });
            });
        });
      });
  }

  deleteById(company: Company): void {
    this.companyService.deleteById(company)
      .subscribe( data => {
        this.companies = this.companies.filter(p => p !== company);
      })
  };

  approve(company: Company) : void {
    this.companyService.sendMail(company)
      .subscribe( data => {
        this.companies.find((c) => c.companyId === company.companyId).status = 'MAIL_SENT';
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
    return company.status == 'APPROVED';
  }

  isMailSent(company: Company) : boolean {
    return company.status == 'MAIL_SENT';
  }

  isBlocked(company: Company) : boolean {
    return company.status == 'BLOCKED';
  }

  hasClaims(company: Company) : boolean {
    return company.claims != null && company.claims.length > 0;
  }

  block(company: Company) {
    if(company.status == 'BLOCKED')
      company.status = 'APPROVED';
    else
      company.status = 'BLOCKED';  
    this.companyService.update(company)
      .subscribe(data => {
        this.companies.find((c) => c.companyId === company.companyId).status = data.status;
      });
  }

}
