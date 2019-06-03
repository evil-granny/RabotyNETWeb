import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Vacancy } from '../../models/vacancy/vacancy.model';
import { Company } from '../../models/company/company.model';
import { Requirement } from '../../models/requirement.model';
import { Role } from '../../models/roles.model';
import { UserPrincipal } from 'src/app/models/userPrincipal.model';

import { VacancyService } from '../../services/vacancy.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'rabotyNet',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css']
})
export class EditVacancyComponent implements OnInit {

  vacancy: Vacancy = new Vacancy();
  company: Company = new Company();
  requirements: Requirement[] = Array<Requirement>();
  currentUser: UserPrincipal;

  employment = 'FULL PART_TIME HOURLY TRAINEE'.split(' ');
  selectedEmployment = 'FULL';
  selectedCurrency = 'USD';

  size: number = 0;

  constructor(private location: Location, private app: AuthenticationService, private route: ActivatedRoute, private router: Router, private vacancyService: VacancyService) {
    this.app.currentUser.subscribe(data => this.currentUser = data);
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    let vacancyId = this.route.snapshot.paramMap.get('vacancyId');
    if (vacancyId !== null) {
      this.vacancyService.get(vacancyId)
        .subscribe(data => {
          this.vacancy = data;
        });
    }
  };

  create(): void {
    this.vacancyService.createVacancy(this.vacancy, this.route.snapshot.paramMap.get('companyId'))
      .subscribe(() => {
        this.router.navigate(['/viewCompany/' + this.route.snapshot.paramMap.get('companyId')]);
      }, error => console.error(error));
  };

  update(): void {
    this.vacancyService.update(this.vacancy)
      .subscribe(() => {
        this.goBack();
      }, error => console.error(error));

  };

  gotoList() {
    this.router.navigate(['/vacancies']);
  }

  changingValue(newValue: string) {
    this.selectedEmployment = newValue;
  }

  addFieldValue() {
    this.vacancy.requirements.push(new Requirement());
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1;
  }

  deleteRequirement(requirement: Requirement): void {
    let flag = confirm("Do you really want to delete?");
    if (flag == false) {
      return;
    } else {
      this.vacancyService.deleteRequiremnetById(requirement.requirementId)
        .subscribe(() => {
          this.requirements = this.requirements.filter(r => r !== requirement);
          window.location.reload();
        });
    }
  };

  removeInputField(index: number): void {
    this.vacancy.requirements.splice(index, 1);
  }

}
