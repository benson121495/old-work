import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvInvEntryBFormComponent } from './formB.component';

describe('FormComponent', () => {
  let component: PnvInvEntryBFormComponent;
  let fixture: ComponentFixture<PnvInvEntryBFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvInvEntryBFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvInvEntryBFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
