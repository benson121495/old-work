import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssgDeclarationComponent } from './declaration.component';

describe('AssgDeclarationComponent', () => {
  let component: AssgDeclarationComponent;
  let fixture: ComponentFixture<AssgDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssgDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssgDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
