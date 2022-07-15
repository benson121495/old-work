import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoeDocumentsComponent } from './documents.component';

describe('CoeDocumentsComponent', () => {
  let component: CoeDocumentsComponent;
  let fixture: ComponentFixture<CoeDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoeDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoeDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
