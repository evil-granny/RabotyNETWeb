import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Vacancy} from '../../models/vacancy/vacancy.model';
import {VacancyService} from '../../services/vacancy.service';
import {Requirement} from 'src/app/models/requirement.model';
import { UserPrincipal } from 'src/app/models/userPrincipal.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Role } from 'src/app/models/roles.model';
import { Location } from '@angular/common';
import { Company } from 'src/app/models/CompanyModel/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-view-vacancy',
  templateUrl: './view-vacancy.component.html',
  styleUrls: ['./view-vacancy.component.scss']
})
export class ViewVacancyComponent implements OnInit {

  vacancy: Vacancy = new Vacancy();
  company : Company = new Company();
 
  constructor(private location: Location,private app: AuthenticationService, private route: ActivatedRoute, private router: Router, private vacancyService: VacancyService
    ,private companyService: CompanyService) {
  }

  goBack() {
    this.location.back();
}
  ngOnInit(): void {
    let vacancyId = this.route.snapshot.paramMap.get('vacancyId');
    if (vacancyId !== null) {
      this.vacancyService.get(vacancyId)
        .subscribe(data => {
          this.vacancy = data;
        });
        this.companyService.getCompanyByVacanycId(vacancyId)
        .subscribe(
          com =>{
            this.company = com;
          });
    } 
  }

  sendResume(){
    // this.location.back();
return;
  }
}
