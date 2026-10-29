import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { ExperienceNav } from '../../../../shared/components/experience-nav/experience-nav';
import { ExperienciaAlquilerService } from '../../../../core/services/experiencia-alquiler.service';
import { ValoracionService } from '../../../../core/services/valoracion.service';
import { ExperienciaAlquiler } from '../../../../core/models/experiencia-alquiler.model';
import { ValoracionRequest } from '../../../../core/models/valoracion-model';

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
export class RateExperience implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly experienciaService = inject(ExperienciaAlquilerService);
  private readonly valoracionService = inject(ValoracionService);

  readonly role = this.authService.getRole();
  readonly isTenant = this.role === 'INQUILINO';

  readonly loading = signal(true);
  readonly submitting = signal(false);
  readonly errorMessage = signal('');
  readonly showSummary = signal(false);
  readonly published = signal(false);

  readonly ratings = signal<Record<string, number>>({});
  readonly comment = signal('');

  personName = '';
  personRoleLabel = '';
  propertyName = '';
  propertyLocation = '';
  startDate = '';
  endDate = '';

  private experienciaId: number | null = null;

  readonly criteria: RatingCriterion[] = this.isTenant
    ? [
        {
          id: 'COMUNICACION',
          label: 'Comunicación',
          description: 'Claridad y facilidad para comunicarse.',
        },
        {
          id: 'TRANSPARENCIA',
          label: 'Transparencia',
          description: 'Honestidad y claridad durante el alquiler.',
        },
        {
          id: 'MANTENIMIENTO',
          label: 'Mantenimiento',
          description: 'Cuidado y estado de la vivienda.',
        },
        {
          id: 'FIANZA',
          label: 'Gestión de la fianza',
          description: 'Claridad y gestión de la devolución de la fianza.',
        },
        {
          id: 'RESPETO',
          label: 'Respeto',
          description: 'Trato y cumplimiento de los acuerdos.',
        },
      ]
    : [
        {
          id: 'COMUNICACION',
          label: 'Comunicación',
          description: 'Claridad y facilidad para comunicarse.',
        },
        {
          id: 'CUIDADO_VIVIENDA',
          label: 'Cuidado de la vivienda',
          description: 'Cuidado y conservación del inmueble.',
        },
        {
          id: 'CUMPLIMIENTO_ACUERDOS',
          label: 'Cumplimiento de acuerdos',
          description: 'Respeto de las condiciones acordadas.',
        },
        {
          id: 'GESTION_INCIDENCIAS',
          label: 'Gestión de incidencias',
          description: 'Comunicación y resolución de problemas.',
        },
        {
          id: 'RESPETO',
          label: 'Respeto',
          description: 'Trato y cumplimiento de los acuerdos.',
        },
      ];

  readonly averageRating = computed(() => {
    const values = Object.values(this.ratings());

    if (!values.length) {
      return 0;
    }

    return values.reduce((sum, value) => sum + value, 0) / values.length;
  });

  readonly allRated = computed(() =>
    this.criteria.every(
      (criterion) => this.ratings()[criterion.id] !== undefined,
    ),
  );

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const id = Number(params.get('experienciaId'));

      if (!Number.isInteger(id) || id <= 0) {
        this.errorMessage.set(
          'No se ha indicado una experiencia válida para valorar.',
        );
        this.loading.set(false);
        return;
      }

      this.experienciaId = id;
      this.cargarExperiencia(id);
    });
  }

  private cargarExperiencia(id: number): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.experienciaService.obtenerMisExperiencias().subscribe({
      next: (experiencias: ExperienciaAlquiler[]) => {
        const experiencia = experiencias.find((item) => item.id === id);

        if (!experiencia) {
          this.errorMessage.set(
            'No se ha encontrado esta experiencia entre tus alquileres.',
          );
          this.loading.set(false);
          return;
        }

        if (experiencia.estado !== 'FINALIZADA') {
          this.errorMessage.set(
            'Solo puedes valorar experiencias finalizadas.',
          );
          this.loading.set(false);
          return;
        }

        this.asignarDatosExperiencia(experiencia);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(
          'No se han podido cargar los datos de la experiencia. Inténtalo de nuevo.',
        );
        this.loading.set(false);
      },
    });
  }

  private asignarDatosExperiencia(experiencia: ExperienciaAlquiler): void {
    this.personName = this.isTenant
      ? `${experiencia.caseroNombre} ${experiencia.caseroApellidos}`
      : `${experiencia.inquilinoNombre} ${experiencia.inquilinoApellidos}`;

    this.personRoleLabel = this.isTenant ? 'Casero' : 'Inquilino';

    this.propertyName = [
      experiencia.viviendaDireccion,
      experiencia.viviendaNumero,
      experiencia.viviendaComplemento,
    ]
      .filter(Boolean)
      .join(', ');

    this.propertyLocation = [
      experiencia.viviendaLocalidad,
      experiencia.viviendaProvincia,
    ]
      .filter(Boolean)
      .join(', ');

    this.startDate = this.formatearFecha(experiencia.fechaInicio);
    this.endDate = experiencia.fechaFin
      ? this.formatearFecha(experiencia.fechaFin)
      : 'No disponible';
  }

  private formatearFecha(fecha: string): string {
    const parsedDate = new Date(`${fecha}T12:00:00`);

    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(parsedDate);
  }

  setRating(criterionId: string, rating: number): void {
    this.ratings.update((current) => ({
      ...current,
      [criterionId]: rating,
    }));

    this.showSummary.set(false);
    this.errorMessage.set('');
  }

  previewRating(): void {
    if (!this.allRated()) {
      return;
    }

    this.showSummary.set(true);
    this.errorMessage.set('');
  }

  publishRating(): void {
    if (!this.allRated() || this.experienciaId === null || this.submitting()) {
      return;
    }

    const request: ValoracionRequest = {
      criterios: this.criteria.map((criterion) => ({
        criterio: criterion.id,
        puntuacion: this.ratings()[criterion.id],
      })),
      comentario: this.comment().trim() || null,
    };

    this.submitting.set(true);
    this.errorMessage.set('');

    this.valoracionService.registrar(this.experienciaId, request).subscribe({
      next: () => {
        this.published.set(true);
        this.submitting.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.submitting.set(false);

        if (error.status === 409) {
          this.errorMessage.set(
            'Ya has valorado esta experiencia.',
          );
        } else if (error.status === 400) {
          this.errorMessage.set(
            error.error?.detail ??
              'La valoración no es válida. Revisa los criterios e inténtalo de nuevo.',
          );
        } else {
          this.errorMessage.set(
            'No se ha podido guardar la valoración. Inténtalo de nuevo.',
          );
        }
      },
    });
  }

  cancel(): void {
    this.showSummary.set(false);
    this.errorMessage.set('');
  }
}