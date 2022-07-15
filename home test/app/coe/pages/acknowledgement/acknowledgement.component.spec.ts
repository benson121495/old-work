import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoeAcknowledgementComponent } from './acknowledgement.component';

describe('CoeAcknowledgementComponent', () => {
  let component: CoeAcknowledgementComponent;
  let fixture: ComponentFixture<CoeAcknowledgementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoeAcknowledgementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoeAcknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
