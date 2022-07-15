import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuralAddressListComponent } from './structural-address-list.component';

describe('StructuralAddressListComponent', () => {
  let component: StructuralAddressListComponent;
  let fixture: ComponentFixture<StructuralAddressListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuralAddressListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuralAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
