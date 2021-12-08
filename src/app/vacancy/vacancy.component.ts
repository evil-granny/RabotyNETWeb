import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Vacancy } from '../models/vacancy/vacancy.model';
import { UserPrincipal } from '../models/userPrincipal.model';

import { VacancyService } from '../services/vacancy.service';
import { CompanyService } from '../services/company.service';
import { AuthenticationService } from '../services/authentication.service';

import { Observable } from 'rxjs';
import {Role} from '../models/roles.model';
import {Company} from '../models/company/company.model';
import {BookmarkService} from '../services/bookmark.service';

@Component({
  selector: 'rabotyNet',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent implements OnInit {

  vacancies: Vacancy[];
  page: number = 0;
  count: number = 9;
  size: number = 0;
  currentUser: UserPrincipal;

  constructor(private app: AuthenticationService, private router: Router, private route: ActivatedRoute, private vacancyService: VacancyService,
              private companyService: CompanyService, private bookmarkService: BookmarkService) {
    this.app.currentUser.subscribe(data => this.currentUser = data);
  }

  ngOnInit() {
    this.findAll();
  };

  findAll() {
    this.vacancyService.findAllWithPagination(this.page * this.count, this.currentUser == null ? 0 : this.currentUser.userId)
      .subscribe(data => {
        this.vacancies = data.vacancies;
        this.size = data.count;
      });
  }

  gotoList() {
    this.router.navigate(['/vacancies']);
  }

  addToBookmark(vacancyId: any): void {
    this.bookmarkService.addVacancyToBookmark(vacancyId, this.currentUser.userId)
      .subscribe(() => {
        this.vacancies.find((vacancy) => vacancy.vacancyId === vacancyId).markedAsBookmark = true;
      });
  }

  removeVacancyFromBookmark(vacancyId: any): void {
    this.bookmarkService.deleteVacancyFromBookmark(vacancyId, this.currentUser.userId)
      .subscribe(() => {
        this.vacancies.find((vacancy) => vacancy.vacancyId === vacancyId).markedAsBookmark = false;
      });
  }

  hasPreviousPage(): boolean {
    return this.page > 0;
  }

  previousPage() {
    if (this.hasPreviousPage()) {
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

  checkWhetherUserHasUserOnlyUserRole() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_USER) > -1 &&
      this.currentUser.roles.indexOf(Role.ROLE_COWNER) === -1 && this.currentUser.roles.indexOf(Role.ROLE_ADMIN) === -1;
  }

}
