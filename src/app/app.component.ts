import { Component } from '@angular/core';

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
export class AppComponent {

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
  
  logout() {
    const user = this.app.logout();
      this.router.navigateByUrl('/vacancies');
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles  &&  this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1;
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles  &&  this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  get isUser() {
    return this.currentUser && this.currentUser.roles  &&  this.currentUser.roles.indexOf(Role.ROLE_USER) > -1;
  }

  hide() {
    this.searchForm = true;
    this.searchShown = false;
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
