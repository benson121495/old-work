import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvTeResidentAFormComponent } from './formA.component';

describe('FormComponent', () => {
  let component: PnvTeResidentAFormComponent;
  let fixture: ComponentFixture<PnvTeResidentAFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvTeResidentAFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvTeResidentAFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
