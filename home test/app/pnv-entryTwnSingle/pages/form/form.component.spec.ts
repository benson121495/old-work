import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvEntryTwnSingleFormComponent } from './form.component';

describe('FormComponent', () => {
  let component: PnvEntryTwnSingleFormComponent;
  let fixture: ComponentFixture<PnvEntryTwnSingleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvEntryTwnSingleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvEntryTwnSingleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
