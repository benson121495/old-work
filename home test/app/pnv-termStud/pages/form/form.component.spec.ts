
import { pnvTermStudFormComponent } from './form.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('ApplicationsBirthSearchFillFormTypeSearchComponent', () => {
  let component: pnvTermStudFormComponent;
  let fixture: ComponentFixture<pnvTermStudFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ pnvTermStudFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(pnvTermStudFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
