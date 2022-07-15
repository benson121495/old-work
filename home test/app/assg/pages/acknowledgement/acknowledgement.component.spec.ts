import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssgAcknowledgementComponent } from './acknowledgement.component';

describe('FdhesAcknowledgementComponent', () => {
  let component: AssgAcknowledgementComponent;
  let fixture: ComponentFixture<AssgAcknowledgementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssgAcknowledgementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssgAcknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
