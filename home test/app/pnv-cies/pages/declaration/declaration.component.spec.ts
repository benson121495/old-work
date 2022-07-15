import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiesDeclarationComponent} from './declaration.component';

describe('CiesDeclarationComponent', () => {
  let component: CiesDeclarationComponent;
  let fixture: ComponentFixture<CiesDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiesDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiesDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
