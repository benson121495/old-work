import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvTermEmpFormComponent } from './form.component';

describe('FormComponent', () => {
  let component: PnvTermEmpFormComponent;
  let fixture: ComponentFixture<PnvTermEmpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvTermEmpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvTermEmpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
