import { TestBed } from '@angular/core/testing';

import { CVService } from './cv.service';

describe('CvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CVService = TestBed.get(CVService);
    expect(service).toBeTruthy();
  });
});
