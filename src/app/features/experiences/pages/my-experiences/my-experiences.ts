import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { ExperienciaAlquilerService } from '../../../../core/services/experiencia-alquiler.service';
import {
  EstadoExperiencia,
  ExperienciaAlquiler,
} from '../../../../core/models/experiencia-alquiler.model';

import { ExperienceNav } from '../../../../shared/components/experience-nav/experience-nav';

interface ExperienceViewModel {
  id: number;
  tenantName: string;
  tenantInitials: string;
  landlordName: string;
  landlordInitials: string;
  propertyName: string;
  city: string;
  startDate: string;
  endDate: string | null;
  status: EstadoExperiencia;
  confirmacionInquilino: boolean;
  confirmacionCasero: boolean;
}

@Component({
  selector: 'app-my-experiences',
  standalone: true,
  imports: [ExperienceNav],
  templateUrl: './my-experiences.html',
  styleUrl: './my-experiences.css',
})
export class MyExperiences implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly experienciaService = inject(ExperienciaAlquilerService);
  private readonly router = inject(Router);

  readonly isTenant = this.authService.getRole() === 'INQUILINO';

  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly actionMessage = signal('');
  readonly confirmingId = signal<number | null>(null);
  readonly reviewTargetId = signal<number | null>(null);

  readonly experiences = signal<ExperienceViewModel[]>([]);
  readonly searchTerm = signal('');
  readonly totalCount = computed(() => this.experiences().length);

  readonly otherPersonRole = this.isTenant ? 'Tu casero' : 'Tu inquilino';

  readonly filteredExperiences = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    return this.experiences().filter((experience) =>
      [
        experience.propertyName,
        experience.city,
        this.otherPersonName(experience),
      ].some((value) => value.toLowerCase().includes(term)),
    );
  });

  readonly pendingExperiences = computed(() =>
    this.filteredExperiences().filter(
      (experience) => experience.status === 'PENDIENTE_CONFIRMACION',
    ),
  );

  readonly confirmedExperiences = computed(() =>
    this.filteredExperiences().filter((experience) => experience.status === 'CONFIRMADA'),
  );

  readonly finishedExperiences = computed(() =>
    this.filteredExperiences().filter((experience) => experience.status === 'FINALIZADA'),
  );

  readonly cancelledExperiences = computed(() =>
    this.filteredExperiences().filter((experience) => experience.status === 'CANCELADA'),
  );

  readonly featuredExperience = computed(() => {
    const pending = this.pendingExperiences();
    const reviewTargetId = this.reviewTargetId();

    return (
      pending.find((experience) => experience.id === reviewTargetId) ??
      pending[0] ??
      null
    );
  });

  readonly rateExperienceRoute = this.isTenant
    ? '/inquilino/experiencias/valorar'
    : '/casero/experiencias/valorar';

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const id = Number(params.get('experienciaId'));
      this.reviewTargetId.set(Number.isInteger(id) && id > 0 ? id : null);
    });

    this.loadExperiences();
  }

  loadExperiences(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.experienciaService.obtenerMisExperiencias().subscribe({
      next: (data) => {
        this.experiences.set(data.map((item) => this.mapExperience(item)));
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar las experiencias:', error);
        this.errorMessage.set('No se han podido cargar tus experiencias. Inténtalo de nuevo.');
        this.loading.set(false);
      },
    });
  }

  private mapExperience(item: ExperienciaAlquiler): ExperienceViewModel {
    const tenantName = this.fullName(item.inquilinoNombre, item.inquilinoApellidos);
    const landlordName = this.fullName(item.caseroNombre, item.caseroApellidos);

    return {
      id: item.id,
      tenantName,
      tenantInitials: this.getInitials(tenantName),
      landlordName,
      landlordInitials: this.getInitials(landlordName),
      propertyName: [
        item.viviendaDireccion,
        item.viviendaNumero,
        item.viviendaComplemento,
      ]
        .filter((part) => part?.trim())
        .join(', ') || 'Vivienda sin dirección',
      city: [item.viviendaLocalidad, item.viviendaProvincia]
        .filter((part) => part?.trim())
        .join(', ') || 'Ubicación no disponible',
      startDate: item.fechaInicio,
      endDate: item.fechaFin,
      status: item.estado,
      confirmacionInquilino: item.confirmacionInquilino,
      confirmacionCasero: item.confirmacionCasero,
    };
  }

  private fullName(
    nombre: string | null | undefined,
    apellidos: string | null | undefined,
  ): string {
    return [nombre, apellidos].filter(Boolean).join(' ') || 'Usuario';
  }

  private getInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  otherPersonName(experience: ExperienceViewModel): string {
    return this.isTenant ? experience.landlordName : experience.tenantName;
  }

  otherPersonInitials(experience: ExperienceViewModel): string {
    return this.isTenant ? experience.landlordInitials : experience.tenantInitials;
  }

  statusLabel(status: EstadoExperiencia): string {
    const labels: Record<EstadoExperiencia, string> = {
      PENDIENTE_CONFIRMACION: 'Pendiente de confirmación',
      CONFIRMADA: 'Confirmada',
      FINALIZADA: 'Finalizada',
      CANCELADA: 'Cancelada',
    };

    return labels[status];
  }

  hasConfirmed(experience: ExperienceViewModel): boolean {
    return this.isTenant ? experience.confirmacionInquilino : experience.confirmacionCasero;
  }

  confirmExperience(experience: ExperienceViewModel): void {
    if (
      this.confirmingId() !== null ||
      experience.status !== 'PENDIENTE_CONFIRMACION' ||
      this.hasConfirmed(experience)
    ) {
      return;
    }

    this.confirmingId.set(experience.id);
    this.actionMessage.set('');

    this.experienciaService.confirmarExperiencia(experience.id).subscribe({
      next: () => {
        this.actionMessage.set('Tu confirmación se ha registrado correctamente.');
        this.loadExperiences();
        this.confirmingId.set(null);
      },
      error: (error) => {
        console.error('Error al confirmar la experiencia:', error);
        this.actionMessage.set('No se ha podido confirmar la experiencia. Inténtalo de nuevo.');
        this.confirmingId.set(null);
      },
    });
  }

  openRating(experience: ExperienceViewModel): void {
    void this.router.navigate([this.rateExperienceRoute], {
      queryParams: { experienciaId: experience.id },
    });
  }

  setSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }
}
