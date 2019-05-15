import {Component, OnInit} from '@angular/core';
import {UserPrincipal} from '../models/userPrincipal.model';
import {Search} from '../models/SearchModel/search.model';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../services/search.service';
import {Role} from '../models/roles.model';
import {SearchVacancyResponse} from '../models/SearchModel/SearchVacancyResponse.model';

@Component({
  selector: 'app-search-vacancy',
  templateUrl: './search-vacancy.component.html',
  styleUrls: ['./search-vacancy.component.scss']
})
export class SearchVacancyComponent implements OnInit {

  currentUser: UserPrincipal;

  search: Search = new Search();
  resultText = true;
  nextButton = true;
  previousButton = true;
  pagesCount: number;
  pageNumber: number;
  searchVacancyResponse: SearchVacancyResponse = new SearchVacancyResponse();

  constructor(private app: AuthenticationService, private router: Router, private searchService: SearchService, private route: ActivatedRoute) {
    this.app.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1;
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  get isUser() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_USER) > -1;
  }

  logout() {
    const user = this.app.logout();
    this.router.navigateByUrl('/vacancies');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.search.searchText = params['text'];
      this.search.searchDocument = params['doc'];
      this.search.searchParameter = params['sParam'];
    });
    if (this.search.searchText.length !== 0) {
      this.startSearch();
    }
  }

  searchCVPage() {
    this.search.searchDocument = 'cvs';
    this.router.navigateByUrl('/searchCV');
  }

  startSearch() {
    this.search.firstResultNumber = 0;
    this.resultText = false;
    this.searchService.getVacancyResult(this.search)
      .subscribe(data => {
        this.searchVacancyResponse = data;
        this.pagesCount = Math.ceil(this.searchVacancyResponse.count / parseInt(this.search.resultsOnPage, 10));
        if (this.searchVacancyResponse.count > parseInt(this.search.resultsOnPage, 10)) {
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
}
