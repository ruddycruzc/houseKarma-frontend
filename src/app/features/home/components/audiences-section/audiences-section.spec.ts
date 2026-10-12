import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { AudiencesSectionComponent } from './audiences-section';

describe('AudiencesSectionComponent', () => {
  let fixture: ComponentFixture<AudiencesSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudiencesSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AudiencesSectionComponent);
    fixture.detectChanges();

    element = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the audiences section', () => {
    expect(element.querySelector('section.audiences')).not.toBeNull();
  });

  it('should render the tenant panel with its content', () => {
    const panel = element.querySelector('.audiences__panel--tenant');

    expect(panel).not.toBeNull();
    expect(panel?.textContent).toContain('Un hogar con contexto');
    expect(panel?.textContent).toContain('Inquilinos');
    expect(panel?.textContent).toContain(
      'Conoce la reputación de los caseros antes de alquilar.',
    );
    expect(panel?.textContent).toContain('Soy inquilino');
  });

  it('should render the landlord panel with its content', () => {
    const panel = element.querySelector('.audiences__panel--landlord');

    expect(panel).not.toBeNull();
    expect(panel?.textContent).toContain('Confianza que permanece');
    expect(panel?.textContent).toContain('Caseros');
    expect(panel?.textContent).toContain(
      'Construye una reputación basada en tus experiencias.',
    );
    expect(panel?.textContent).toContain('Soy casero');
  });

  it('should render the tenant panel before the landlord panel', () => {
    const panels = element.querySelectorAll('.audiences__panel');

    expect(panels.length).toBe(2);
    expect(panels[0].classList).toContain('audiences__panel--tenant');
    expect(panels[1].classList).toContain('audiences__panel--landlord');
  });

  it('should render one CTA button for each audience', () => {
    const buttons = element.querySelectorAll('.audiences__cta');

    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Soy inquilino');
    expect(buttons[1].textContent).toContain('Soy casero');
  });

  it('should provide accessible names for the CTA buttons', () => {
    const buttons = element.querySelectorAll('.audiences__cta');

    expect(buttons[0].getAttribute('aria-label')).toBe('Soy inquilino');
    expect(buttons[1].getAttribute('aria-label')).toBe('Soy casero');
  });
});