import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoeDeclarationComponent } from './declaration.component';

describe('CoeDeclarationComponent', () => {
  let component: CoeDeclarationComponent;
  let fixture: ComponentFixture<CoeDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoeDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoeDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
