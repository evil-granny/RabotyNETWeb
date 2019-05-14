import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/CompanyModel/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Claim } from 'src/app/models/claim.model';
import { UserService } from 'src/app/services/user.service';
import { Vacancy } from 'src/app/models/vacancy/vacancy.model';
import { VacancyService } from 'src/app/services/vacancy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'rabotyNet',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.scss']
})
export class ViewCompanyComponent implements OnInit {

  company: Company = new Company();
  claim: Claim = new Claim();
  vacancies: Observable<Vacancy[]>;

  claiming: boolean = false;

  page: number = 0;
  count: number = 4;
  size: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private companyService: CompanyService,
    private userService: UserService, private vacancyService: VacancyService) { }

  ngOnInit() {
    var companyName = this.route.snapshot.paramMap.get("companyName");
    if(companyName != null) {
      this.companyService.findByName(companyName)
        .subscribe(data => {
          this.companyService.findClaims(data)
            .subscribe( data1 => {
              data.claims = [];
              data1.forEach(function(claim) {
                data.claims.push(claim);
              });

              this.company = data;
            });   
        })
    }
    this.findVacancies();
  }

  findVacancies() {
    this.vacancyService.findVacanciesByCompanyName(this.route.snapshot.paramMap.get("companyName"), this.page * this.count, this.count).subscribe(
      data => {
             this.vacancies = data;
             this.vacancies = data.vacancies;
             this.size = data.count; 
        }
    )
  }

  createClaim(): void {

    this.userService.findById(1)
      .subscribe(data => {
        this.claiming = false;

        this.claim.user = data;
        
        this.claim.company = this.company;

        this.companyService.createClaim(this.claim)
          .subscribe(data => {
            this.company = data;
          });
      });
    
  }

  canPrev() : boolean {
    return this.page > 0;
  }

  prev() {
    if(this.canPrev()) {
      this.page = this.page - 1;
      this.findVacancies();
    }
  }

  canNext() : boolean {
    return (this.page + 1) * this.count < this.size;
  }

  next() {
    if(this.canNext()) {
      this.page = this.page + 1;
      this.findVacancies();
    }
  }

  isApproved() : boolean {
    return this.company.status == 'APPROVED';
  }

  isMailSent() : boolean {
    return this.company.status == 'MAIL_SENT';
  }

  isBlocked() : boolean {
    return this.company.status == 'BLOCKED';
  }

  hasClaims() : boolean {
    return this.company.claims != null && this.company.claims.length > 0;
  }

}
