import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';
import { LandingHero } from './landing-hero';

describe('LandingHero', () => {
  let fixture: ComponentFixture<LandingHero>;
  let component: LandingHero;

  const getButton = (label: string): HTMLButtonElement =>
    fixture.nativeElement.querySelector(`button[aria-label="${label}"]`);

  const getTitle = (): string => fixture.nativeElement.querySelector('h1').textContent.trim();

  const getCount = (): string => fixture.nativeElement.querySelector('.slide-count').textContent;

  const nextSlide = (): void => {
    getButton('Diapositiva siguiente').click();
    fixture.detectChanges();
  };

  const previousSlide = (): void => {
    getButton('Diapositiva anterior').click();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingHero],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the first slide initially', () => {
    expect(getTitle()).toContain('Alquilar también es construir reputación.');
    expect(getCount()).toContain('01');
  });

  it('should render four slides in the component configuration', () => {
    expect(component['slides']).toHaveLength(4);
  });

  it('should advance to the next slide', () => {
    nextSlide();

    expect(getTitle()).toContain('Cada experiencia cuenta.');
    expect(getCount()).toContain('02');
  });

  it('should return to the previous slide', () => {
    nextSlide();
    previousSlide();

    expect(getTitle()).toContain('Alquilar también es construir reputación.');
    expect(getCount()).toContain('01');
  });

  it('should wrap to the last slide when going back from the first', () => {
    previousSlide();

    expect(getTitle()).toContain('Tu reputación habla antes que tú.');
    expect(getCount()).toContain('04');
  });

  it('should wrap to the first slide after the last slide', () => {
    nextSlide();
    nextSlide();
    nextSlide();
    nextSlide();

    expect(getTitle()).toContain('Alquilar también es construir reputación.');
    expect(getCount()).toContain('01');
  });

  it('should update the image when changing slides', () => {
    nextSlide();

    const image: HTMLImageElement = fixture.nativeElement.querySelector('.hero-image img');

    expect(image.getAttribute('src')).toBe('/images/hero/image2-hero-housekarma.jpg');
  });

  it('should provide local image paths for all slides', () => {
    expect(component['slides'].map((slide) => slide.image)).toEqual([
      '/images/hero/image1-hero-housekarma.jpg',
      '/images/hero/image2-hero-housekarma.jpg',
      '/images/hero/image3-hero-housekarma.jpg',
      '/images/hero/image4-hero-housekarma.jpg',
    ]);
  });
});
