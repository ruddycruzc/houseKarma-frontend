import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HowItWorksSectionComponent } from './how-it-works-section';

describe('HowItWorksSectionComponent', () => {
  let fixture: ComponentFixture<HowItWorksSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItWorksSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HowItWorksSectionComponent);
    fixture.detectChanges();

    element = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the section heading', () => {
    const heading = element.querySelector('#how-it-works-title');

    expect(heading).not.toBeNull();
    expect(heading?.textContent).toContain(
      'De una experiencia real a una reputación útil.',
    );
  });

  it('should display the section label and number', () => {
    expect(element.textContent).toContain('02');
    expect(element.textContent).toContain('Cómo funciona');
  });

  it('should render the three steps in the correct order', () => {
    const steps = element.querySelectorAll('.how-it-works__step');

    expect(steps.length).toBe(3);
    expect(steps[0].textContent).toContain('Crea tu perfil');
    expect(steps[1].textContent).toContain('Vive una experiencia');
    expect(steps[2].textContent).toContain('Construye tu reputación');
  });

  it('should display the corresponding number for each step', () => {
    const numbers = element.querySelectorAll(
      '.how-it-works__step-number',
    );

    expect(Array.from(numbers).map((number) => number.textContent?.trim())).toEqual([
      '01',
      '02',
      '03',
    ]);
  });

  it('should render a description for every step', () => {
    const descriptions = element.querySelectorAll(
      '.how-it-works__step-description',
    );

    expect(descriptions.length).toBe(3);

    descriptions.forEach((description) => {
      expect(description.textContent?.trim().length).toBeGreaterThan(0);
    });
  });

  it('should use an ordered list for the process steps', () => {
    expect(element.querySelector('ol.how-it-works__steps')).not.toBeNull();
  });

  it('should associate the section with its accessible heading', () => {
    const section = element.querySelector('section');
    const heading = element.querySelector('#how-it-works-title');

    expect(section?.getAttribute('aria-labelledby')).toBe(
      'how-it-works-title',
    );
    expect(heading?.tagName).toBe('H2');
  });
});