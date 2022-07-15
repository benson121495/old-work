import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdhesDocumentsComponent } from './documents.component';

describe('FdhesDocumentsComponent', () => {
  let component: FdhesDocumentsComponent;
  let fixture: ComponentFixture<FdhesDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdhesDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdhesDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
