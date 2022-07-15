
import { pnvExtendTechtasBDeclarationComponent } from './declarationB.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('ApplicationsBirthSearchFillFormTypeSearchComponent', () => {
  let component: pnvExtendTechtasBDeclarationComponent;
  let fixture: ComponentFixture<pnvExtendTechtasBDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ pnvExtendTechtasBDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(pnvExtendTechtasBDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
