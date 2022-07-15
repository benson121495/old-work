import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssgDocumentsComponent } from './documents.component';

describe('FdhesDocumentsComponent', () => {
  let component: AssgDocumentsComponent;
  let fixture: ComponentFixture<AssgDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssgDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssgDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
