import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LandlordHeader } from './landlord-header';

describe('LandlordHeader', () => {
  let component: LandlordHeader;
  let fixture: ComponentFixture<LandlordHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandlordHeader],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LandlordHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
