import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvInvEntryAFormComponent } from './formA.component';

describe('FormComponent', () => {
  let component: PnvInvEntryAFormComponent;
  let fixture: ComponentFixture<PnvInvEntryAFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvInvEntryAFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvInvEntryAFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
