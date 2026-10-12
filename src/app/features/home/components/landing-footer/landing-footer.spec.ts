
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { LandingFooterComponent } from './landing-footer';

describe('LandingFooterComponent', () => {
  let fixture: ComponentFixture<LandingFooterComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingFooterComponent);
    fixture.detectChanges();

    element = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the HouseKarma brand', () => {
    expect(element.querySelector('.footer__logo-house')?.textContent).toBe(
      'House',
    );
    expect(element.querySelector('.footer__logo-karma')?.textContent).toBe(
      'Karma',
    );
  });

  it('should display the brand tagline', () => {
    expect(element.textContent).toContain(
      'Experiencias que construyen reputación.',
    );
  });

  it('should render the product and information navigation groups', () => {
    const headings = Array.from(
      element.querySelectorAll('.footer__heading'),
    ).map((heading) => heading.textContent?.trim());

    expect(headings).toEqual(['Producto', 'Información']);
  });

  it('should render all five navigation links', () => {
    const links = element.querySelectorAll('.footer__links a');

    expect(links.length).toBe(5);
    expect(element.textContent).toContain('Cómo funciona');
    expect(element.textContent).toContain('Para inquilinos');
    expect(element.textContent).toContain('Para caseros');
    expect(element.textContent).toContain('Privacidad');
    expect(element.textContent).toContain('Contacto');
  });

  it('should provide an accessible label for the navigation', () => {
    expect(
      element.querySelector('nav')?.getAttribute('aria-label'),
    ).toBe('Navegación del pie de página');
  });

  it('should display the current year in the copyright', () => {
    expect(element.querySelector('.footer__bottom')?.textContent).toContain(
      String(new Date().getFullYear()),
    );
  });

  it('should render the footer as a semantic landmark', () => {
    expect(element.querySelector('footer')).not.toBeNull();
  });
});
