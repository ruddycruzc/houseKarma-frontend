import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordLayout } from './landlord-layout';

describe('LandlordLayout', () => {
  let component: LandlordLayout;
  let fixture: ComponentFixture<LandlordLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandlordLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(LandlordLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
