import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvChangeEmpDHBFormComponent } from './formB.component';

describe('FormComponent', () => {
  let component: PnvChangeEmpDHBFormComponent;
  let fixture: ComponentFixture<PnvChangeEmpDHBFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvChangeEmpDHBFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvChangeEmpDHBFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
