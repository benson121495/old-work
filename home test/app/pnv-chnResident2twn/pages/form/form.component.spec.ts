import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvChnResident2TwnFormComponent } from './form.component';

describe('FormComponent', () => {
  let component: PnvChnResident2TwnFormComponent;
  let fixture: ComponentFixture<PnvChnResident2TwnFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvChnResident2TwnFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvChnResident2TwnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
