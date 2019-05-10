import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Vacancy} from '../models/vacancy.model';
import {VacancyService} from '../services/vacancy.service';
import {CompanyService} from '../services/company.service';
import {Observable} from 'rxjs';
import {Requirement} from '../models/requirement.model';
import {AuthenticationService} from '../services/authentication.service';
import {Role} from '../models/roles.model';
import {UserPrincipal} from '../models/userPrincipal.model';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rabotyNet',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent implements OnInit {
  vacancies: Observable<Vacancy[]>;
  requirements: Observable<Requirement[]>;

  currentUser: UserPrincipal;

  p: number = 1;

  vacancy: Vacancy = new Vacancy();

  constructor(private app: AuthenticationService, private router: Router, private vacancyService: VacancyService, private companyService: CompanyService) {
    this.app.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.reloadData();
    // this.currentUser = this.app.currentUserValue;
  };
  

  reloadData() {
     this.vacancyService.findAll().subscribe(
       data => {
         this.vacancies = data;
         console.log(this.vacancies);
       }
     );
  }

  gotoList() {
    this.router.navigate(['/vacancies']);
  }

  update(vacancyId): void {
    this.vacancyService.update(this.vacancyService.get(vacancyId))
      .subscribe(data => {
        this.gotoList();
      }, error => console.error(error));
  };

  deleteById(id: number): void {
    this.vacancyService.deleteById(id)
      .subscribe(
        data => {
          this.reloadData();
        },
        error => console.log(error));
  };

  get isAdmin() {
    // console.log('ADMIN')
    // console.log(this.currentUser)
    return this.currentUser && this.currentUser.roles  &&  this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1;
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles  &&  this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  get isUser() {
    return this.currentUser && this.currentUser.roles  &&  this.currentUser.roles.indexOf(Role.ROLE_USER) > -1;
  }

  logout() {
    const user = this.app.logout();
      this.router.navigateByUrl('/vacancies');
  }

}
