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
import { CVService } from 'src/app/services/resume.service';
import { CV } from 'src/app/models/resume.model';

@Component({
  selector: 'app-view-vacancy',
  templateUrl: './view-vacancy.component.html',
  styleUrls: ['./view-vacancy.component.scss']
})
export class ViewVacancyComponent implements OnInit {
  currentUser: UserPrincipal;
  vacancy: Vacancy = new Vacancy();
  company : Company = new Company();
  resume : CV = new CV();
 
  constructor(private location: Location,private app: AuthenticationService,private resumeService : CVService ,private route: ActivatedRoute, private router: Router, private vacancyService: VacancyService
    ,private companyService: CompanyService) {
      this.app.currentUser.subscribe(x => this.currentUser = x);
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
    // this.app.currentUser
    this.resumeService.findByUserId().subscribe(data=>{
   this.resume = data;
   console.log(this.resume);
    });
    this.vacancyService.sendResume(this.resume).subscribe(data => {
    }, error => console.error(error));;
    // console.log(resume);
    // this.location.back();
  }

}
