import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDesignerComponent } from './pdf-designer.component';

describe('PdfDesignerComponent', () => {
  let component: PdfDesignerComponent;
  let fixture: ComponentFixture<PdfDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PdfDesignerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
