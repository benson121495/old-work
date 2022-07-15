import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssgFlowSelectComponent } from './flow-select.component';

describe('AssgFlowSelectComponent', () => {
  let component: AssgFlowSelectComponent;
  let fixture: ComponentFixture<AssgFlowSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssgFlowSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssgFlowSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
