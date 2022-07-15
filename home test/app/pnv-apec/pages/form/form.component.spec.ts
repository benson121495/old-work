
import { pnvApecFormComponent } from './form.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('ApplicationsBirthSearchFillFormTypeSearchComponent', () => {
  let component: pnvApecFormComponent;
  let fixture: ComponentFixture<pnvApecFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ pnvApecFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(pnvApecFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
