import {Component, OnInit} from '@angular/core';
import {Search} from '../models/SearchModel/search.model';
import {SearchVacancyComponent} from '../search-vacancy/search-vacancy.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchVacancyComponent],
})

export class SearchComponent implements OnInit {
  search: Search = new Search();
  button = false;
  form = true;

  constructor(private searchVacancyComponent: SearchVacancyComponent,
              private router: Router) { }

  ngOnInit() {
    this.search.searchDocument = 'vacancies';
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
    this.searchVacancyComponent.sendToSearch(this.search);
  }
}
