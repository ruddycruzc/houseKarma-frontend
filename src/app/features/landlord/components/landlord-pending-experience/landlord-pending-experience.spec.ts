import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordPendingExperience } from './landlord-pending-experience';

describe('LandlordPendingExperience', () => {
  let component: LandlordPendingExperience;
  let fixture: ComponentFixture<LandlordPendingExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandlordPendingExperience],
    }).compileComponents();

    fixture = TestBed.createComponent(LandlordPendingExperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
