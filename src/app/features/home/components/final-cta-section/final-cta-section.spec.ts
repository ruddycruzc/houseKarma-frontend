import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { FinalCtaSectionComponent } from './final-cta-section';

describe('FinalCtaSectionComponent', () => {
  let fixture: ComponentFixture<FinalCtaSectionComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalCtaSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinalCtaSectionComponent);
    fixture.detectChanges();

    element = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the section heading', () => {
    expect(element.querySelector('#final-cta-title')?.textContent).toContain(
      'Construye una reputación que te acompañe.',
    );
  });

  it('should render the eyebrow and description', () => {
    expect(element.textContent).toContain(
      'Tu próxima experiencia empieza aquí',
    );
    expect(element.textContent).toContain(
      'Únete a HouseKarma y convierte tus experiencias de alquiler en confianza.',
    );
  });

  it('should render the create-account and login buttons', () => {
    const buttons = element.querySelectorAll('.final-cta__button');

    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Crear cuenta');
    expect(buttons[1].textContent).toContain('Iniciar sesión');
  });

  it('should provide accessible names for both buttons', () => {
    const buttons = element.querySelectorAll('.final-cta__button');

    expect(buttons[0].getAttribute('aria-label')).toBe('Crear cuenta');
    expect(buttons[1].getAttribute('aria-label')).toBe('Iniciar sesión');
  });

  it('should distinguish the primary and secondary actions', () => {
    expect(
      element.querySelector('.final-cta__button--primary'),
    ).not.toBeNull();

    expect(
      element.querySelector('.final-cta__button--secondary'),
    ).not.toBeNull();
  });
});