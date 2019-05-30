import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedVacancyComponent } from './closed-vacancy.component';

describe('ClosedVacancyComponent', () => {
  let component: ClosedVacancyComponent;
  let fixture: ComponentFixture<ClosedVacancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedVacancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
