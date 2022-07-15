import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoeRequirementsComponent } from './requirements.component';

describe('CoeRequirementsComponent', () => {
  let component: CoeRequirementsComponent;
  let fixture: ComponentFixture<CoeRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoeRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoeRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
