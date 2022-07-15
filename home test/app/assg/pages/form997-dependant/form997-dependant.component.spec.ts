import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssgForm997DependantComponent } from './form997-dependant.component';

describe('AssgForm997DependantComponent', () => {
  let component: AssgForm997DependantComponent;
  let fixture: ComponentFixture<AssgForm997DependantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssgForm997DependantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssgForm997DependantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
