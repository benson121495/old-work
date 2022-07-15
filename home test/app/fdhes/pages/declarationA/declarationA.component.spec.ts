import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdhesDeclarationAComponent } from './declarationA.component';

describe('FdhesDeclarationAComponent', () => {
  let component: FdhesDeclarationAComponent;
  let fixture: ComponentFixture<FdhesDeclarationAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdhesDeclarationAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdhesDeclarationAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
