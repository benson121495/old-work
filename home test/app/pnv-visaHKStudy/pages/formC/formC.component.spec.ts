
import { pnvVisaHkStudyCFormComponent } from './formC.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('ApplicationsBirthSearchFillFormTypeSearchComponent', () => {
  let component: pnvVisaHkStudyCFormComponent;
  let fixture: ComponentFixture<pnvVisaHkStudyCFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ pnvVisaHkStudyCFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(pnvVisaHkStudyCFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
