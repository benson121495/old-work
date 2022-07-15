import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnvQmasEntryFormComponent } from './form.component';

describe('FormComponent', () => {
  let component: PnvQmasEntryFormComponent;
  let fixture: ComponentFixture<PnvQmasEntryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnvQmasEntryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnvQmasEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
