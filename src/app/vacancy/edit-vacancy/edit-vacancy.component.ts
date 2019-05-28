import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Vacancy} from '../../models/vacancy/vacancy.model';
import {VacancyService} from '../../services/vacancy.service';
import {Requirement} from 'src/app/models/requirement.model';
import {UserPrincipal} from 'src/app/models/userPrincipal.model';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {Role} from 'src/app/models/roles.model';
import {Location} from '@angular/common';
import { FormArray } from '@angular/forms';
import { Company } from 'src/app/models/CompanyModel/company.model';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rabotyNet',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css']
})
export class EditVacancyComponent implements OnInit {

  vacancy: Vacancy = new Vacancy();
  requirements: Requirement[] = Array<Requirement>();
  currentUser: UserPrincipal;
  company: Company = new Company();
  employment = 'FULL PART_TIME HOURLY TRAINEE'.split(' ');
  selectedEmployment = 'FULL';
  selectedCurrency = 'USD';
  size : number = 0;

  constructor(private location: Location, private app: AuthenticationService, private route: ActivatedRoute, private router: Router, private vacancyService: VacancyService) {
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
    }
  }

  create(): void {
    this.vacancyService.createVacancy(this.vacancy, this.route.snapshot.paramMap.get('companyId'))
      .subscribe(data => {
        this.router.navigate(['/viewCompany/' + this.route.snapshot.paramMap.get('companyId')]);
      }, error => console.error(error));
  };

  update(): void {
    this.vacancyService.update(this.vacancy)
      .subscribe(data => {
        this.goBack();
      }, error => console.error(error));

  };


  gotoList() {
    this.router.navigate(['/vacancies']);
  }

  changingValue(newValue) {
    this.selectedEmployment = newValue;
  }

  addFieldValue() {
    
    this.vacancy.requirements.push(new Requirement());
    console.log(this.vacancy.requirements.length);
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1;
  }

  deleteRequirement(requirement: Requirement): void {
    let flag = confirm("Do you really want to delete?");
    if(flag==false){
      return;
    }
    else{
    this.vacancyService.deleteRequiremnetById(requirement.requirementId)
      .subscribe( data => {
        this.requirements = this.requirements.filter(p => p !== requirement);
        window.location.reload();
      })
    }
  };

  removeInputField(index : number) : void{
  this.vacancy.requirements.splice(index,1); 
}

}
