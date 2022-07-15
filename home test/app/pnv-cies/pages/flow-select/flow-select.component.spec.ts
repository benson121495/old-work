import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { pnvCiesFlowSelectComponent } from './flow-select.component';

describe('pnvCiesFlowSelectComponent', () => {
  let component: pnvCiesFlowSelectComponent;
  let fixture: ComponentFixture<pnvCiesFlowSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ pnvCiesFlowSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(pnvCiesFlowSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
