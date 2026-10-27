import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ExperienceNav } from '../../../../shared/components/experience-nav/experience-nav';

type RatingCriterion = {
  id: string;
  label: string;
  description: string;
};

@Component({
  selector: 'app-rate-experience',
  standalone: true,
  imports: [FormsModule, RouterLink, ExperienceNav],
  templateUrl: './rate-experience.html',
  styleUrl: './rate-experience.css',
})
export class RateExperience {
  private readonly authService = inject(AuthService);

  readonly role = this.authService.getRole();
  readonly isTenant = this.role === 'INQUILINO';

  readonly personName = this.isTenant
    ? 'María García'
    : 'Laura Fernández';

  readonly personRoleLabel = this.isTenant ? 'Casero' : 'Inquilino';

  readonly propertyName = 'Piso en Gijón';
  readonly propertyLocation = 'Gijón, Asturias';
  readonly startDate = '12 marzo 2026';
  readonly endDate = '30 septiembre 2026';

  readonly criteria: RatingCriterion[] = [
    {
      id: 'comunicacion',
      label: 'Comunicación',
      description: 'Claridad y facilidad para comunicarse.',
    },
    {
      id: 'transparencia',
      label: 'Transparencia',
      description: 'Honestidad y claridad durante el alquiler.',
    },
    {
      id: 'mantenimiento',
      label: 'Mantenimiento',
      description: 'Cuidado y estado de la vivienda.',
    },
    {
      id: 'fianza',
      label: 'Gestión de la fianza',
      description: 'Claridad y gestión de la devolución de la fianza.',
    },
    {
      id: 'respeto',
      label: 'Respeto',
      description: 'Trato y cumplimiento de los acuerdos.',
    },
  ];

  readonly ratings = signal<Record<string, number>>({});
  readonly comment = signal('');
  readonly showSummary = signal(false);
  readonly published = signal(false);

  readonly averageRating = computed(() => {
    const values = Object.values(this.ratings());

    if (values.length === 0) {
      return 0;
    }

    return values.reduce((sum, value) => sum + value, 0) / values.length;
  });

  readonly allRated = computed(() =>
    this.criteria.every((criterion) => this.ratings()[criterion.id] !== undefined),
  );

  setRating(criterionId: string, rating: number): void {
    this.ratings.update((current) => ({
      ...current,
      [criterionId]: rating,
    }));

    this.showSummary.set(false);
  }

  previewRating(): void {
    if (!this.allRated()) {
      return;
    }

    this.showSummary.set(true);
  }

  publishRating(): void {
    if (!this.allRated()) {
      return;
    }

    // Solo confirmamos la interacción visual en esta fase.
    // La persistencia se conectará cuando esté definido el backend de valoraciones.
    this.published.set(true);
  }

  cancel(): void {
    this.showSummary.set(false);
  }
}