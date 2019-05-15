import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVacancyComponent } from './search-vacancy.component';

describe('SearchVacancyComponent', () => {
  let component: SearchVacancyComponent;
  let fixture: ComponentFixture<SearchVacancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVacancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
