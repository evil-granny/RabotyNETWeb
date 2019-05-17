import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Search} from '../models/SearchModel/search.model';
import {SearchVacancyResponse} from '../models/SearchModel/SearchVacancyResponse.model';
import {SearchService} from '../services/search.service';
import {SearchComponent} from '../search/search.component';

@Component({
  selector: 'app-search-vacancy',
  templateUrl: './search-vacancy.component.html',
  styleUrls: ['./search-vacancy.component.scss'],
  providers: [SearchComponent]
})
export class SearchVacancyComponent implements OnInit {
  search: Search = new Search();
  searchVacancyResponse: SearchVacancyResponse = new SearchVacancyResponse();
  pageNumber: number;
  pagesCount: number;
  resultText = true;
  topButtons = true;
  previousButton: boolean;
  nextButton: boolean;
  bottomButtons = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private searchComponent: SearchComponent,
              private searchService: SearchService) {
  }

  ngOnInit() {
    console.log('OnInit SearchVacancy');
    this.route.params
      .subscribe(params => {
        this.search.searchDocument = params['searchDoc'];
        this.search.searchText = params['searchText'];
        this.search.searchParameter = params['searchParameter'];
      });
    if (this.search.searchText !== undefined) {
      this.startSearch();
    }
  }

  startSearch() {
    this.searchComponent.form = false;
    console.log('Search parameters vacancy= ' + JSON.stringify(this.search));
    this.search.firstResultNumber = 0;
    this.resultText = false;
    this.searchService.getVacancyResult(this.search)
      .subscribe(data => {
        this.searchVacancyResponse = data;
        console.log('Vacancy Response = ' + JSON.stringify(this.searchVacancyResponse));
        this.buttonsEnabled();
      });
  }

  buttonsEnabled() {
    this.pagesCount = Math.ceil(this.searchVacancyResponse.count / parseInt(this.search.resultsOnPage, 10));
    if (this.searchVacancyResponse.count > parseInt(this.search.resultsOnPage, 10)) {
      this.topButtons = false;
      this.nextButton = false;
      this.previousButton = true;
      this.pageNumber = 1;
      if (parseInt(this.search.resultsOnPage, 10) > 10 && this.searchVacancyResponse.searchVacancyDTOS.length > 15) {
        this.bottomButtons = false;
      }
    } else {
      this.topButtons = true;
      this.nextButton = true;
      this.previousButton = true;
      this.pageNumber = 1;
      this.bottomButtons = true;
    }
  }

  nextPage() {
    this.search.firstResultNumber = this.search.firstResultNumber + parseInt(this.search.resultsOnPage, 10);
    this.searchService.getVacancyResult(this.search)
      .subscribe(data => {
        this.searchVacancyResponse = data;
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
    this.searchService.getVacancyResult(this.search)
      .subscribe(data => {
        this.searchVacancyResponse = data;
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

  findVacancies(search: Search) {
    this.search = search;
    this.startSearch();
  }
}
