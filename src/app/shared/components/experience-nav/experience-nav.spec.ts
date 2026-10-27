import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceNav } from './experience-nav';

describe('ExperienceNav', () => {
  let component: ExperienceNav;
  let fixture: ComponentFixture<ExperienceNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceNav],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
