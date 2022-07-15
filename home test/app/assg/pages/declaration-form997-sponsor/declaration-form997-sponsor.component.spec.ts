import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssgDeclarationForm997SponsorComponent } from './declaration-form997-sponsor.component';

describe('AssgDeclarationComponent', () => {
  let component: AssgDeclarationForm997SponsorComponent;
  let fixture: ComponentFixture<AssgDeclarationForm997SponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssgDeclarationForm997SponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssgDeclarationForm997SponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
