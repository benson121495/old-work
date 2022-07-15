import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiesAcknowledgementComponent } from './acknowledgement.component';

describe('FdhesAcknowledgementComponent', () => {
  let component: CiesAcknowledgementComponent;
  let fixture: ComponentFixture<CiesAcknowledgementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiesAcknowledgementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiesAcknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
