import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvMfdsBFormComponent } from './formB.component';

describe('FormComponent', () => {
  let component: PnvMfdsBFormComponent;
  let fixture: ComponentFixture<PnvMfdsBFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvMfdsBFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvMfdsBFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
