import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { SearchCVService } from '../services/search-cv.service';
import { Search } from '../models/SearchModel/search.model';
import {SearchCVResult} from '../models/SearchModel/searchCVResult.model';
import {SearchCVResponse} from '../models/SearchModel/SearchCVResponse.model';
import {Role} from '../models/roles.model';
import {UserPrincipal} from '../models/userPrincipal.model';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-search-cv',
  templateUrl: './search-cv.component.html',
  styleUrls: ['./search-cv.component.scss']
})

export class SearchCVComponent implements OnInit {

  currentUser: UserPrincipal;

  search: Search = new Search();
  searchCVResponse: SearchCVResponse = new SearchCVResponse();
  searchCVResult: SearchCVResult = new SearchCVResult();
  resultText = true;
  nextButton = true;
  previousButton = true;
  pagesCount: number;
  pageNumber: number;

  constructor(private app: AuthenticationService, private router: Router, private searchCVService: SearchCVService) { }

  get isAdmin() {
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

  startSearch() {
    this.search.firstResultNumber = 0;
    this.resultText = false;
    this.searchCVService.getResult(this.search)
      .subscribe(data => {
        this.searchCVResponse = data;
        this.pagesCount = Math.ceil(this.searchCVResponse.count / parseInt(this.search.resultsOnPage, 10));
        if (this.searchCVResponse.count > parseInt(this.search.resultsOnPage, 10)) {
          this.nextButton = false;
          this.previousButton = true;
          this.pageNumber = 1;
        } else {
          this.nextButton = true;
          this.previousButton = true;
          this.pageNumber = 1;
        }
      });
  }

  nextPage() {
    this.search.firstResultNumber = this.search.firstResultNumber + parseInt(this.search.resultsOnPage, 10);
    this.searchCVService.getResult(this.search)
      .subscribe(data => {
        this.searchCVResponse = data;
        this.pageNumber++;
        if (this.pageNumber === this.pagesCount) {
          this.nextButton = true;
        }
        if (this.pageNumber !== 1) {
          this.previousButton = false;
        }
      });
  }

  previousPage() {
    this.search.firstResultNumber = this.search.firstResultNumber - parseInt(this.search.resultsOnPage, 10);
    this.searchCVService.getResult(this.search)
      .subscribe(data => {
        this.searchCVResponse = data;
        this.pageNumber--;
        if (this.pageNumber === this.pagesCount) {
          this.nextButton = true;
        } else {
          this.nextButton = false;
        }
        if (this.pageNumber > 1) {
          this.previousButton = false;
        } else {
          this.previousButton = true;
        }
      });
  }

  vacancyPage() {
    this.search.searchDocument = 'vacancies';
    this.router.navigateByUrl('/vacancies');
  }

  ngOnInit(): void {
    this.search.searchDocument = 'cvs';
  }
}
