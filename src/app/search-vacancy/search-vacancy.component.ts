import {Component, OnInit} from '@angular/core';
import {UserPrincipal} from '../models/userPrincipal.model';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Role} from '../models/roles.model';
import {Search} from '../models/SearchModel/search.model';
import {SearchVacancyResponse} from '../models/SearchModel/SearchVacancyResponse.model';
import {SearchService} from '../services/search.service';

;

@Component({
  selector: 'app-search-vacancy',
  templateUrl: './search-vacancy.component.html',
  styleUrls: ['./search-vacancy.component.scss']
})
export class SearchVacancyComponent implements OnInit {
  currentUser: UserPrincipal;
  search: Search = new Search();
  searchVacancyResponse: SearchVacancyResponse = new SearchVacancyResponse();
  pageNumber: number;
  pagesCount: number;
  resultText = true;
  topButtons = true;
  previousButton: boolean;
  nextButton: boolean;
  bottomButtons = true;


  constructor(private app: AuthenticationService,
              private router: Router,
              private searchService: SearchService,
              private route: ActivatedRoute) {
    this.app.currentUser.subscribe(x => this.currentUser = x);
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  ngOnInit() {
    this.search.searchDocument = 'vacancies';
  }

  startSearch() {
    console.log('Search parameters = ' + JSON.stringify(this.search));
    this.search.firstResultNumber = 0;
    this.resultText = false;
    this.searchService.getVacancyResult(this.search)
      .subscribe(data => {
        this.searchVacancyResponse = data;
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

  searchCVPage() {
    this.router.navigateByUrl('/searchCV');
  }
}
