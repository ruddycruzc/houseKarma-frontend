import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ExperienceSectionComponent } from './experience-section';

describe('ExperienceSectionComponent', () => {
  let fixture: ComponentFixture<ExperienceSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceSectionComponent);
    fixture.detectChanges();

    element = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the section heading', () => {
    expect(element.querySelector('#experience-title')?.textContent).toContain(
      'Una experiencia conecta la historia completa.',
    );
  });

  it('should display the experience reference and status', () => {
    expect(element.textContent).toContain('Experiencia HK');
    expect(element.textContent).toContain('0248');
    expect(element.textContent).toContain('Finalizada');
  });

  it('should display the property details', () => {
    expect(element.textContent).toContain('Calle del Olmo, 24');
    expect(element.textContent).toContain('Madrid');
    expect(element.textContent).toContain('2 años y 3 meses');
  });

  it('should display the tenant and landlord', () => {
    expect(element.textContent).toContain('Elena M.');
    expect(element.textContent).toContain('Marcos R.');
  });

  it('should display the start and end dates', () => {
    expect(element.textContent).toContain('12 Sep 2022');
    expect(element.textContent).toContain('18 Dic 2024');
  });

  it('should render the rating CTA as a button', () => {
    const button = element.querySelector<HTMLButtonElement>(
      '.experience-card__cta',
    );

    expect(button).not.toBeNull();
    expect(button?.textContent).toContain('Valorar experiencia');
    expect(button?.disabled).toBe(false);
  });

  it('should render the experience details inside an article', () => {
    expect(element.querySelector('article.experience-card')).not.toBeNull();
  });
});