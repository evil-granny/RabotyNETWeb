import {Component} from '@angular/core';
import { Router } from '@angular/router';

import { SearchCVService } from '../services/search-cv.service';
import { SearchCV } from '../models/SearcModel/searchCV.model';
import {SearchCVResult} from '../models/SearcModel/searchCVResult.model';
import {SearchCVResponse} from '../models/SearcModel/SearchCVResponse.model';

@Component({
  selector: 'app-search-cv',
  templateUrl: './search-cv.component.html',
  styleUrls: ['./search-cv.component.scss']
})

export class SearchCVComponent {
  searchCv: SearchCV = new SearchCV();
  searchCVResponse: SearchCVResponse = new SearchCVResponse();
  searchCVResult: SearchCVResult = new SearchCVResult();
  resultText = true;
  nextButton = true;
  previousButton = true;
  pagesCount: number;
  pageNumber: number;

  constructor(private router: Router, private searchCVService: SearchCVService) { }

  startSearch() {
    this.searchCv.resultsOnPage = 10;
    this.searchCv.firstResultNumber = 0;
    this.resultText = false;
    this.searchCVService.getResult(this.searchCv)
      .subscribe(data => {
        this.searchCVResponse = data;
        this.pagesCount = Math.ceil(this.searchCVResponse.count / parseInt(this.searchCv.resultsOnPage, 10));
        if (this.searchCVResponse.count > parseInt(this.searchCv.resultsOnPage, 10)) {
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
    this.searchCv.firstResultNumber = this.searchCv.firstResultNumber + parseInt(this.searchCv.resultsOnPage, 10);
    this.searchCVService.getResult(this.searchCv)
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
    this.searchCv.firstResultNumber = this.searchCv.firstResultNumber - parseInt(this.searchCv.resultsOnPage, 10);
    this.searchCVService.getResult(this.searchCv)
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
}
