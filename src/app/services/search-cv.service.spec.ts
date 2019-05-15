import { TestBed } from '@angular/core/testing';

import { SearchCvService } from './search.service';

describe('SearchCvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchCvService = TestBed.get(SearchCvService);
    expect(service).toBeTruthy();
  });
});
