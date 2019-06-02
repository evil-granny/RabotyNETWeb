import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Vacancy } from '../models/vacancy/vacancy.model';
import { UserPrincipal } from '../models/userPrincipal.model';

import { VacancyService } from '../services/vacancy.service';
import { CompanyService } from '../services/company.service';
import { AuthenticationService } from '../services/authentication.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'rabotyNet',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent implements OnInit {

  vacancies: Observable<Vacancy[]>;
  vacancy: Vacancy = new Vacancy();
  currentUser: UserPrincipal;

  page: number = 0;
  count: number = 9;
  size: number = 0;

  constructor(private app: AuthenticationService, private router: Router, private route: ActivatedRoute, private vacancyService: VacancyService, private companyService: CompanyService) {
    this.app.currentUser.subscribe(data => this.currentUser = data);
  };

  ngOnInit() {
    this.findAll();
  };

  findAll() {
    this.vacancyService.findAllWithPagination(this.page * this.count)
      .subscribe(data => {
        this.vacancies = data.vacancies;
        this.size = data.count;
      });
  }

  gotoList() {
    this.router.navigate(['/vacancies']);
  };

  canPreviousPage(): boolean {
    return this.page > 0;
  }

  previousPage() {
    if (this.canPreviousPage()) {
      this.page = this.page - 1;
      this.findAll();
    }
  }

  canNextPage(): boolean {
    return (this.page + 1) * this.count < this.size;
  }

  nextPage() {
    if (this.canNextPage()) {
      this.page = this.page + 1;
      this.findAll();
    }
  }

}
