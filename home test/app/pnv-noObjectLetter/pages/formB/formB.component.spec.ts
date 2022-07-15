
import { pnvNoObjectLetterBFormComponent } from './form.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('ApplicationsBirthSearchFillFormTypeSearchComponent', () => {
  let component: pnvNoObjectLetterBFormComponent;
  let fixture: ComponentFixture<pnvNoObjectLetterBFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ pnvNoObjectLetterBFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(pnvNoObjectLetterBFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
