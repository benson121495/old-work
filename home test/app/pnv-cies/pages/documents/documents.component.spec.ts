import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiesDocumentsComponent } from './documents.component';

describe('CiesDocumentsComponent', () => {
  let component: CiesDocumentsComponent;
  let fixture: ComponentFixture<CiesDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiesDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiesDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
