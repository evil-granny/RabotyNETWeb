import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Search} from '../models/SearchModel/search.model';
import {UserPrincipal} from '../models/userPrincipal.model';
import {AuthenticationService} from '../services/authentication.service';
import {Role} from '../models/roles.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  @Output() findVacancies = new EventEmitter<Search>();
  @Output() findResume = new EventEmitter<Search>();
  search: Search = new Search();
  button = false;
  form = true;
  vacancySelect = true;
  resumeSelect = true;
  private currentUser: UserPrincipal;

  constructor(private app: AuthenticationService, private router: Router) {
    this.app.currentUser.subscribe(x => this.currentUser = x);
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  ngOnInit() {
    switch (this.search.searchDocument) {
      case 'resume':
        console.log('Oninit search resume = ' + this.search.searchDocument);
        this.resumeSelect = false;
        this.vacancySelect = true;
        break;
      case 'vacancies':
        console.log('Oninit search vacancies = ' + this.search.searchDocument);
        this.resumeSelect = true;
        this.vacancySelect = false;
        break;
    }
  }

  hide() {
    this.form = true;
    this.button = false;
  }

  show() {
    this.form = false;
    this.button = true;
  }

  start() {
    switch (this.search.searchDocument) {
      case 'resume':
        this.router.navigate(['/searchCV', {
          searchDoc: this.search.searchDocument,
          searchText: this.search.searchText,
          searchParameter: this.search.searchParameter
        }]);
        this.findResume.emit(this.search);
        break;
      case 'vacancies':
        this.router.navigate(['/vacancies/search', {
          searchDoc: this.search.searchDocument,
          searchText: this.search.searchText,
          searchParameter: this.search.searchParameter
        }]);
        this.findVacancies.emit(this.search);
        break;
    }
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
}
