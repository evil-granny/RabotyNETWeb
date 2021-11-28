import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Vacancy} from '../models/vacancy/vacancy.model';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VacancyService} from '../services/vacancy.service';
import {CompanyService} from '../services/company.service';
import {BookmarkService} from '../services/bookmark.service';
import {UserPrincipal} from '../models/userPrincipal.model';
import {Role} from '../models/roles.model';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  vacancies: Vacancy[];
  page: number = 0;
  count: number = 9;
  size: number = 0;
  currentUser: UserPrincipal;

  constructor(private app: AuthenticationService, private router: Router, private route: ActivatedRoute, private vacancyService: VacancyService, private bookmarkService: BookmarkService) {
  }

  ngOnInit() {
    this.app.currentUser.subscribe((data) => (this.currentUser = data));
    this.findAll();
  }

  findAll() {
    this.bookmarkService.getBookmarksByUserIdWithPagination(this.currentUser.userId, this.page * this.count)
      .subscribe(data => {
        this.vacancies = data.vacancies;
        this.size = data.count;
      });
  }

  removeVacancyFromBookmark(vacancyId: any): void {
    this.bookmarkService.deleteVacancyFromBookmark(vacancyId, this.currentUser.userId)
      .subscribe(() => {
        this.vacancies = this.vacancies.filter((vacancy) => vacancy.vacancyId !== vacancyId);
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

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  get isUser() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_USER) > -1;
  }

}
