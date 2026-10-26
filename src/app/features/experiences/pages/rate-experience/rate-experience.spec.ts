import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateExperience } from './rate-experience';

describe('RateExperience', () => {
  let component: RateExperience;
  let fixture: ComponentFixture<RateExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateExperience],
    }).compileComponents();

    fixture = TestBed.createComponent(RateExperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
