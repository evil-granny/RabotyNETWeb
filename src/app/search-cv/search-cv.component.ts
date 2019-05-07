import { Component } from '@angular/core';
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
  searchCVResults: SearchCVResult[];
  searchCVResponse: SearchCVResponse;

  constructor(private router: Router, private searchCVService: SearchCVService) { }

  startSearch() {
    this.searchCv.firstResultNumber = 0;
    this.searchCVService.getResult(this.searchCv)
      .subscribe(data => {
        this.searchCVResponse = data;
      });
  }

  nextPage() {
    this.searchCv.firstResultNumber = this.searchCv.firstResultNumber + this.searchCv.resultsOnPage;
    this.searchCVService.getResult(this.searchCv)
      .subscribe(data => {
        this.searchCVResponse = data;
      });
  }

}
