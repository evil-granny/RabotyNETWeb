import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SearchService} from '../services/search.service';
import {Search} from '../models/SearchModel/search.model';
import {SearchCVResponse} from '../models/SearchModel/SearchCVResponse.model';
import {PdfService} from '../services/pdf.service';
import {SearchComponent} from '../search/search.component';
import {UserPrincipal} from '../models/userPrincipal.model';
import {AuthenticationService} from '../services/authentication.service';
import {Role} from '../models/roles.model';

@Component({
  selector: 'app-search-cv',
  templateUrl: './search-cv.component.html',
  styleUrls: ['./search-cv.component.scss'],
  providers: [SearchComponent]
})

export class SearchCVComponent implements OnInit {

  currentUser: UserPrincipal;
  search: Search = new Search();
  searchCVResponse: SearchCVResponse = new SearchCVResponse();
  resultText = true;
  nextButton = true;
  previousButton = true;
  pagesCount: number;
  pageNumber: number;
  topButtons = true;
  bottomButtons = true;
  vacancySelect = true;
  resumeSelect = false;
  urlPdf = 'false';

  constructor(private app: AuthenticationService,
              private router: Router,
              private pdfService: PdfService,
              private route: ActivatedRoute,
              private searchComponent: SearchComponent,
              private searchCVService: SearchService) {
    this.app.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    console.log('OnInit SearchResume');
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

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  startSearch() {
    // console.log('Search parameters resume = ' + JSON.stringify(this.search));
    this.search.firstResultNumber = 0;
    this.resultText = false;
    this.searchCVService.getCVResult(this.search)
      .subscribe(data => {
        this.searchCVResponse = data;
        // console.log('CV response = ' + JSON.stringify(this.searchCVResponse));
        this.buttonsEnabled();
      });
  }

  buttonsEnabled() {
    this.pagesCount = Math.ceil(this.searchCVResponse.count / parseInt(this.search.resultsOnPage, 10));
    if (this.searchCVResponse.count > parseInt(this.search.resultsOnPage, 10)) {
      this.topButtons = false;
      this.nextButton = false;
      this.previousButton = true;
      this.pageNumber = 1;
      if (parseInt(this.search.resultsOnPage, 10) > 10 && this.searchCVResponse.searchCVDTOs.length > 15) {
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
    this.searchCVService.getCVResult(this.search)
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
    this.searchCVService.getCVResult(this.search)
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

  viewCv(id: Uint8Array) {
    this.pdfService.show(id)
      .subscribe(data => {
        var file = new Blob([data], {type: 'application/pdf'});
        console.log(file);
        var fileURL = URL.createObjectURL(file);
        console.log(fileURL);
        this.urlPdf = fileURL;
        window.open(fileURL);
        window.focus();
      });
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

  start() {
    switch (this.search.searchDocument) {
      case 'resume':
        this.startSearch();
        break;
      case 'vacancies':
        this.router.navigate(['/vacancies/search', {
          searchDoc: this.search.searchDocument,
          searchText: this.search.searchText,
          searchParameter: this.search.searchParameter
        }]);
        break;
    }
  }
}
