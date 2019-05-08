import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCompanyComponent } from './approve-company.component';

describe('ApproveCompanyComponent', () => {
  let component: ApproveCompanyComponent;
  let fixture: ComponentFixture<ApproveCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
