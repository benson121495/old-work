import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssgForm997SponsorComponent } from './form997-sponsor.component';

describe('AssgForm997SponsorComponenet', () => {
  let component: AssgForm997SponsorComponent;
  let fixture: ComponentFixture<AssgForm997SponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssgForm997SponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssgForm997SponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
