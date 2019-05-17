import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Search} from '../models/SearchModel/search.model';
import {SearchVacancyComponent} from '../search-vacancy/search-vacancy.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  @Output() find = new EventEmitter<Search>();
  search: Search = new Search();
  button = false;
  form = true;

  constructor() { }

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
    this.find.emit(this.search);
  }
}
