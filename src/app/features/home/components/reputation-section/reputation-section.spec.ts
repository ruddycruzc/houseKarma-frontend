import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ReputationSectionComponent } from './reputation-section';

describe('ReputationSectionComponent', () => {
  let fixture: ComponentFixture<ReputationSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReputationSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReputationSectionComponent);
    fixture.detectChanges();

    element = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the reputation heading and description', () => {
    expect(element.querySelector('#reputation-title')?.textContent).toContain(
      'La confianza no se inventa. Se construye.',
    );

    expect(element.textContent).toContain('Reputación HouseKarma');
    expect(element.textContent).toContain(
      'Cada valoración procede de una experiencia de alquiler finalizada.',
    );
  });

  it('should display the example overall score and experience count', () => {
    expect(element.querySelector('.reputation-card__score')?.textContent).toContain(
      '4.9',
    );

    expect(element.querySelector('.reputation-card__meta')?.textContent).toContain(
      '12 experiencias',
    );
  });

  it('should render five illustrative stars', () => {
    const stars = element.querySelectorAll(
      '.reputation-card__stars span',
    );

    expect(stars.length).toBe(5);
    expect(element.querySelector('.reputation-card__stars')?.getAttribute('role'))
      .toBe('img');
  });

  it('should render the five reputation categories in the expected order', () => {
    const names = Array.from(
      element.querySelectorAll('.reputation-category__name'),
    ).map((name) => name.textContent?.trim());

    expect(names).toEqual([
      'Comunicación',
      'Transparencia',
      'Mantenimiento',
      'Gestión de la fianza',
      'Respeto',
    ]);
  });

  it('should render a progress bar and score for each category', () => {
    const bars = element.querySelectorAll(
      '.reputation-category__track[role="progressbar"]',
    );
    const scores = Array.from(
      element.querySelectorAll('.reputation-category__score'),
    ).map((score) => score.textContent?.trim());

    expect(bars.length).toBe(5);
    expect(scores).toEqual(['4.9', '4.8', '4.7', '5.0', '4.9']);
  });

  it('should expose each category score with an accessible range', () => {
    const bars = element.querySelectorAll(
      '.reputation-category__track',
    );

    bars.forEach((bar) => {
      expect(bar.getAttribute('aria-valuemin')).toBe('0');
      expect(bar.getAttribute('aria-valuemax')).toBe('5');
      expect(bar.getAttribute('aria-valuenow')).not.toBeNull();
      expect(bar.getAttribute('aria-label')).not.toBeNull();
    });
  });

  it('should identify the reputation panel as an example', () => {
    expect(
      element.querySelector('.reputation-card')?.getAttribute('aria-label'),
    ).toContain('Ejemplo ilustrativo');
  });
});