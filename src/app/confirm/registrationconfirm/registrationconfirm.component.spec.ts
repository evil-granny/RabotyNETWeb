import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationconfirmComponent } from './registrationconfirm.component';

describe('RegistrationconfirmComponent', () => {
  let component: RegistrationconfirmComponent;
  let fixture: ComponentFixture<RegistrationconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
