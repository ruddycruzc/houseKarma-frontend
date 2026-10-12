
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
  });

  it('should create the home page', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all seven landing sections in order', () => {
    const element = fixture.nativeElement as HTMLElement;

    const expectedSections = [
      'app-landing-hero',
      'app-rental-story-section',
      'app-how-it-works-section',
      'app-audiences-section',
      'app-reputation-section',
      'app-experience-section',
      'app-final-cta-section',
    ];

    const renderedSections = Array.from(
      element.querySelectorAll(
        expectedSections.join(','),
      ),
    ).map((section) => section.tagName.toLowerCase());

    expect(renderedSections).toEqual(expectedSections);
  });
});
