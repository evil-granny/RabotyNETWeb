import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from '../services/search.service';
import { Search } from '../models/SearchModel/search.model';
import { SearchResumeResponse } from '../models/SearchModel/SearchResumeResponse.model';
import { PdfService } from '../services/pdf.service';
import { UserPrincipal } from '../models/userPrincipal.model';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '../models/roles.model';

@Component({
  selector: 'app-search-resume',
  templateUrl: './search-resume.component.html',
  styleUrls: ['./search-resume.component.scss'],
})

export class SearchResumeComponent implements OnInit {

  currentUser: UserPrincipal;
  search: Search = new Search();
  searchResumeResponse: SearchResumeResponse = new SearchResumeResponse();
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
  send = false;
  fnHidden = false;
  lnHidden = true;
  aHidden = true;
  posHidden = true;
  cHidden = true;
  phHidden = true;

  constructor(private app: AuthenticationService,
    private router: Router,
    private pdfService: PdfService,
    private route: ActivatedRoute,
    private searchService: SearchService) {
    this.app.currentUser.subscribe(x => this.currentUser = x);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.search.searchDocument = params['searchDoc'];
        this.search.searchText = params['searchText'];
        this.search.searchParameter = params['searchParameter'];
      });
    if (this.search.searchText !== undefined) {
      this.startSearch();
    } else {
      this.search.searchDocument = 'resume';
      this.search.searchParameter = 'position';
    }
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  startSearch() {
    this.search.firstResultNumber = 0;
    this.resultText = false;
    this.searchService.getResumeResult(this.search)
      .subscribe(data => {
        this.searchResumeResponse = data;
        this.buttonsEnabled();
      });
  }

  buttonsEnabled() {
    this.pagesCount = Math.ceil(this.searchResumeResponse.count / parseInt(this.search.resultsOnPage, 10));
    if (this.searchResumeResponse.count > parseInt(this.search.resultsOnPage, 10)) {
      this.topButtons = false;
      this.nextButton = false;
      this.previousButton = true;
      this.pageNumber = 1;
      if (parseInt(this.search.resultsOnPage, 10) > 10 && this.searchResumeResponse.searchResumeDTOS.length > 15) {
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
    this.searchService.getResumeResult(this.search)
      .subscribe(data => {
        this.searchResumeResponse = data;
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
    this.searchService.getResumeResult(this.search)
      .subscribe(data => {
        this.searchResumeResponse = data;
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
    this.pdfService.show(id, this.send)
      .subscribe(data => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
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
        this.router.navigate(['/search/vacancies', {
          searchDoc: this.search.searchDocument,
          searchText: this.search.searchText,
          searchParameter: this.search.searchParameter
        }]);
        break;
    }
  }

  sort(sortText: string) {
    this.hideAll();
    switch (sortText) {
      case 'firstName':
        this.fnHidden = false;
        break;
      case 'lastName':
        this.lnHidden = false;
        break;
      case 'age':
        this.aHidden = false;
        break;
      case 'position':
        this.posHidden = false;
        break;
      case 'city':
        this.cHidden = false;
        break;
      case 'phone':
        this.phHidden = false;
        break;
      default:
        this.hideAll();
    }
    this.search.searchSort = sortText;
    this.startSearch();
  }

  hideAll() {
    this.fnHidden = true;
    this.lnHidden = true;
    this.aHidden = true;
    this.posHidden = true;
    this.cHidden = true;
    this.phHidden = true;
  }
}
