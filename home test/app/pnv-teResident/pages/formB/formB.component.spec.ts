import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvTeResidentBFormComponent } from './formB.component';

describe('FormComponent', () => {
  let component: PnvTeResidentBFormComponent;
  let fixture: ComponentFixture<PnvTeResidentBFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvTeResidentBFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvTeResidentBFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
