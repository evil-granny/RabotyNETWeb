import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotVacancyComponent } from './hot-vacancy.component';

describe('HotVacancyComponent', () => {
  let component: HotVacancyComponent;
  let fixture: ComponentFixture<HotVacancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotVacancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
