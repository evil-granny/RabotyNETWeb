export class Search {

  searchText: string;

  searchParameter: string;

  searchDocument: string;

  searchSort: string;

  direction: string;

  resultsOnPage: string;

  firstResultNumber: number;

  constructor() {
    this.resultsOnPage = '3';
    this.firstResultNumber = 0;
    this.searchParameter = 'position';
    this.searchDocument = 'vacancies';
    this.searchSort = 'position';
    this.direction = 'asc';
  }

}

