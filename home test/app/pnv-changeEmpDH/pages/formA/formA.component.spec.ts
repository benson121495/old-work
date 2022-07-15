import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvChangeEmpDHAFormComponent } from './formA.component';

describe('FormComponent', () => {
  let component: PnvChangeEmpDHAFormComponent;
  let fixture: ComponentFixture<PnvChangeEmpDHAFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvChangeEmpDHAFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvChangeEmpDHAFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
