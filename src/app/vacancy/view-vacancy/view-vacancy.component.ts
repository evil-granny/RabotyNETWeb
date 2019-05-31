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
import {Resume} from 'src/app/models/resume.model';
import {ResumeService} from '../../services/resume.service';

@Component({
  selector: 'app-view-vacancy',
  templateUrl: './view-vacancy.component.html',
  styleUrls: ['./view-vacancy.component.scss']
})
export class ViewVacancyComponent implements OnInit {
  currentUser: UserPrincipal;
  vacancy: Vacancy = new Vacancy();
  company : Company = new Company();
  resume : Resume = new Resume();
 
  constructor(private location: Location, private app: AuthenticationService,private resumeService : ResumeService , private route: ActivatedRoute, private router: Router, private vacancyService: VacancyService
    , private companyService: CompanyService) {
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

  // sendResume() {
  //   this.resumeService.findByUserId().subscribe(data=>{
  //   this.resume = data;
  // });
  //   this.vacancyService.sendResume(this.resume,this.vacancyId).subscribe(data => {
  //     alert("Resume was sent on this resume")
  //   }, error => console.error(error));
  // }

  showPreviewPdf(): void {

    this.resumeService.findByUserId()
      .subscribe(data => {
        if (data != null)
          {this.resume = data;
          this.router.navigate(['/previewResumePdf', this.resume.resumeId, this.vacancy.vacancyId])}
        else
          alert("Validation problem has been occured");
      });
}

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  get isUser() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_USER) > -1;
  }

}
