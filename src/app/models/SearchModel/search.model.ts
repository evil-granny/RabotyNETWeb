export class Search {

  searchText: string;

  searchParameter: string;

  searchDocument: string;

  searchSort: string;

  resultsOnPage: string;

  firstResultNumber: number;

  constructor() {
    this.resultsOnPage = '10';
    this.firstResultNumber = 0;
    this.searchParameter = 'position';
    this.searchDocument = 'vacancies';
    this.searchSort = 'name';
  }

}

