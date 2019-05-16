import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessNonauthorizedPageComponent } from './access-nonauthorized-page.component';

describe('AccessNonauthorizedPageComponent', () => {
  let component: AccessNonauthorizedPageComponent;
  let fixture: ComponentFixture<AccessNonauthorizedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessNonauthorizedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessNonauthorizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
