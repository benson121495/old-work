import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdhesFlowSelectComponent } from './flow-select.component';

describe('FdhesFlowSelectComponent', () => {
  let component: FdhesFlowSelectComponent;
  let fixture: ComponentFixture<FdhesFlowSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdhesFlowSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdhesFlowSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
