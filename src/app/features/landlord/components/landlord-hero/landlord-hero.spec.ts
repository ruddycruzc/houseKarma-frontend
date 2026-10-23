import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordHero } from './landlord-hero';

describe('LandlordHero', () => {
  let component: LandlordHero;
  let fixture: ComponentFixture<LandlordHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandlordHero],
    }).compileComponents();

    fixture = TestBed.createComponent(LandlordHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
