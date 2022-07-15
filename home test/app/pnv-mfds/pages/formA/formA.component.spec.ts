import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvMfdsAFormComponent } from './formA.component';

describe('FormComponent', () => {
  let component: PnvMfdsAFormComponent;
  let fixture: ComponentFixture<PnvMfdsAFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvMfdsAFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvMfdsAFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
