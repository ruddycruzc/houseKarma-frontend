import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';

import { RentalStorySectionComponent } from './rental-story-section';

describe('RentalStorySectionComponent', () => {
  let fixture: ComponentFixture<RentalStorySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalStorySectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RentalStorySectionComponent);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the section heading and description', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(
      element.querySelector('#rental-story-title')?.textContent,
    ).toContain('El alquiler también deja huella.');

    expect(element.querySelector('.rental-story__description')).toBeTruthy();
  });

  it('should display the three stages of the rental relationship', () => {
    const element: HTMLElement = fixture.nativeElement;
    const cards = element.querySelectorAll('.story-card');

    expect(cards.length).toBe(3);
    expect(element.textContent).toContain('Inquilino');
    expect(element.textContent).toContain('Vivienda');
    expect(element.textContent).toContain('Casero');
  });

  it('should label the connections between the stages', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('Experiencia');
    expect(element.textContent).toContain('Confianza');
  });
});