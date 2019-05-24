import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCvComponent } from './view-resume.component';

describe('ViewCvComponent', () => {
  let component: ViewCvComponent;
  let fixture: ComponentFixture<ViewCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
