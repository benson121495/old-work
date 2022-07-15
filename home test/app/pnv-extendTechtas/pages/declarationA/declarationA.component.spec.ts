
import { pnvExtendTechtasADeclarationComponent } from './declarationA.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('ApplicationsBirthSearchFillFormTypeSearchComponent', () => {
  let component: pnvExtendTechtasADeclarationComponent;
  let fixture: ComponentFixture<pnvExtendTechtasADeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ pnvExtendTechtasADeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(pnvExtendTechtasADeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
