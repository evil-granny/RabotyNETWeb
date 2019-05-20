import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Search } from './models/SearchModel/search.model';
import { UserPrincipal } from './models/userPrincipal.model';
import {Role} from './models/roles.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  search: Search = new Search();
  currentUser: UserPrincipal;

  constructor(private app: AuthenticationService,
              private router: Router) {
    this.app.currentUser.subscribe(x => this.currentUser = x);
  }

  title = 'RabotyNet';
  searchForm = true;
  searchShown = false;
  vacancySelect = false;
  resumeSelect = true;

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  ngOnInit() {
    if (this.router.url.includes('/searchCV')) {
      this.disableSearchButton();
    }
  }

  hide() {
    this.searchForm = true;
    this.searchShown = false;
  }

  disableSearchButton() {
    this.searchShown = true;
  }

  showSearchForm() {
    this.searchForm = false;
    this.searchShown = true;
  }

  selectDocument() {
    switch (this.search.searchDocument) {
      case 'resume':
        this.resumeSelect = false;
        this.vacancySelect = true;
        break;
      case 'vacancies':
        this.resumeSelect = true;
        this.vacancySelect = false;
        break;
    }
  }

  startSearch() {
    switch (this.search.searchDocument) {
      case 'resume':
        this.router.navigate(['/searchCV', {
          searchDoc: this.search.searchDocument,
          searchText: this.search.searchText,
          searchParameter: this.search.searchParameter
        }]);
        break;
      case 'vacancies':
        this.router.navigate(['/vacancies/search', {
          searchDoc: this.search.searchDocument,
          searchText: this.search.searchText,
          searchParameter: this.search.searchParameter
        }]);
        break;
    }
    this.hide();
  }
}
