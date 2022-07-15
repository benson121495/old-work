import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvChangeEmpDHCFormComponent } from './formC.component';

describe('FormComponent', () => {
  let component: PnvChangeEmpDHCFormComponent;
  let fixture: ComponentFixture<PnvChangeEmpDHCFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvChangeEmpDHCFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvChangeEmpDHCFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
