import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalOptionListComponent } from './hospital-option-list.component';

describe('HospitalOptionListComponent', () => {
  let component: HospitalOptionListComponent;
  let fixture: ComponentFixture<HospitalOptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalOptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
