import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdhesAcknowledgementComponent } from './acknowledgement.component';

describe('FdhesAcknowledgementComponent', () => {
  let component: FdhesAcknowledgementComponent;
  let fixture: ComponentFixture<FdhesAcknowledgementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdhesAcknowledgementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdhesAcknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
