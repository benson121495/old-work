
import { pnvTravelPassFreqFormComponent } from './form.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('ApplicationsBirthSearchFillFormTypeSearchComponent', () => {
  let component: pnvTravelPassFreqFormComponent;
  let fixture: ComponentFixture<pnvTravelPassFreqFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ pnvTravelPassFreqFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(pnvTravelPassFreqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
