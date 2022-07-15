import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvStatusMainlandOfficialFormComponent } from './form.component';

describe('FormComponent', () => {
  let component: PnvStatusMainlandOfficialFormComponent;
  let fixture: ComponentFixture<PnvStatusMainlandOfficialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvStatusMainlandOfficialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvStatusMainlandOfficialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
