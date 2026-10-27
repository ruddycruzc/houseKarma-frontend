import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { ExperienciaAlquilerService } from '../../../../core/services/experiencia-alquiler.service';
import { ExperienciaAlquiler } from '../../../../core/models/experiencia-alquiler.model';

import { ExperienceNav } from '../../../../shared/components/experience-nav/experience-nav';

type ExperienceStatus = 'ACTIVE' | 'PENDING' | 'CONFIRMED' | 'FINISHED' | 'CANCELLED';

type ExperienceFilter = 'ALL' | 'ACTIVE' | 'PENDING' | 'FINISHED';

interface MockExperience {
  id: number;
  tenantName: string;
  tenantInitials: string;
  landlordName: string;
  landlordInitials: string;
  propertyName: string;
  city: string;
  startDate: string;
endDate: string | null;
  status: ExperienceStatus;
  rated: boolean;
  recent: boolean;
  description: string;
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
  private readonly experienciaService = inject(ExperienciaAlquilerService);
  private readonly router = inject(Router);

  readonly isTenant = this.authService.getRole() === 'INQUILINO';

  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly actionMessage = signal('');
  readonly confirmingId = signal<number | null>(null);

  readonly experiences = signal<MockExperience[]>([]);
  readonly searchTerm = signal('');
  readonly selectedFilter = signal<ExperienceFilter>('ALL');
  readonly totalCount = computed(() => this.experiences().length);

  readonly recentCount = computed(
    () => this.experiences().filter((experience) => experience.recent).length,
  );

  readonly otherPersonRole = this.isTenant ? 'Tu casero' : 'Tu inquilino';

  readonly activeExperiences = computed(() =>
    this.filteredExperiences().filter((experience) => experience.status === 'ACTIVE'),
  );

  readonly pendingExperiences = computed(() =>
    this.filteredExperiences().filter(
      (experience) => experience.status === 'PENDING' || experience.status === 'CONFIRMED',
    ),
  );

  readonly finishedExperiences = computed(() =>
    this.filteredExperiences().filter((experience) => experience.status === 'FINISHED'),
  );

  readonly activeCount = computed(
    () => this.experiences().filter((experience) => experience.status === 'ACTIVE').length,
  );

  readonly pendingCount = computed(
    () =>
      this.experiences().filter(
        (experience) => experience.status === 'PENDING' || experience.status === 'CONFIRMED',
      ).length,
  );

  readonly finishedCount = computed(
    () => this.experiences().filter((experience) => experience.status === 'FINISHED').length,
  );

  readonly ratedCount = computed(
    () => this.finishedExperiences().filter((experience) => experience.rated).length,
  );

  readonly featuredExperience = computed(
    () =>
      this.experiences().find(
        (experience) => experience.status === 'PENDING' || experience.status === 'CONFIRMED',
      ) ??
      this.experiences()[0] ??
      null,
  );

  readonly filteredExperiences = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const filter = this.selectedFilter();

    return this.experiences().filter((experience) => {
      const matchesSearch =
        !term ||
        experience.propertyName.toLowerCase().includes(term) ||
        experience.city.toLowerCase().includes(term) ||
        this.otherPersonName(experience).toLowerCase().includes(term);

      const matchesFilter =
        filter === 'ALL' ||
        (filter === 'ACTIVE' && experience.status === 'ACTIVE') ||
        (filter === 'PENDING' &&
          (experience.status === 'PENDING' || experience.status === 'CONFIRMED')) ||
        (filter === 'FINISHED' && experience.status === 'FINISHED');

      return matchesSearch && matchesFilter;
    });
  });

  readonly rateExperienceRoute = this.isTenant
    ? '/inquilino/experiencias/valorar'
    : '/casero/experiencias/valorar';

  ngOnInit(): void {
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

  private mapExperience(item: ExperienciaAlquiler): MockExperience {
    const tenantName = this.fullName(item.inquilinoNombre, item.inquilinoApellidos);

    const landlordName = this.fullName(item.caseroNombre, item.caseroApellidos);

    const propertyName = [item.viviendaDireccion, item.viviendaNumero, item.viviendaComplemento]
      .filter(Boolean)
      .join(', ');

    const city = [item.viviendaLocalidad, item.viviendaProvincia].filter(Boolean).join(', ');

    return {
      id: item.id,
      tenantName,
      tenantInitials: this.getInitials(tenantName),
      landlordName,
      landlordInitials: this.getInitials(landlordName),
      propertyName: propertyName || 'Vivienda sin dirección',
      city: city || 'Ubicación no disponible',
      startDate: item.fechaInicio,
      endDate: item.fechaFin,
      status: this.mapStatus(item.estado),
      rated: false,
      recent: false,
      description: 'Experiencia de alquiler registrada en HouseKarma.',
      confirmacionInquilino: item.confirmacionInquilino,
      confirmacionCasero: item.confirmacionCasero,
    };
  }

  private mapStatus(status: ExperienciaAlquiler['estado']): ExperienceStatus {
    switch (status) {
      case 'PENDIENTE_CONFIRMACION':
        return 'PENDING';
      case 'CONFIRMADA':
        return 'CONFIRMED';
      case 'FINALIZADA':
        return 'FINISHED';
      case 'CANCELADA':
        return 'CANCELLED';
      default:
        return 'PENDING';
    }
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

  otherPersonName(experience: MockExperience): string {
    return this.isTenant ? experience.landlordName : experience.tenantName;
  }

  otherPersonInitials(experience: MockExperience): string {
    return this.isTenant ? experience.landlordInitials : experience.tenantInitials;
  }

  statusLabel(status: ExperienceStatus): string {
    const labels: Record<ExperienceStatus, string> = {
      ACTIVE: 'En curso',
      PENDING: 'Pendiente de confirmación',
      CONFIRMED: 'Confirmada',
      FINISHED: 'Finalizada',
      CANCELLED: 'Cancelada',
    };

    return labels[status];
  }

  hasConfirmed(experience: MockExperience): boolean {
    return this.isTenant ? experience.confirmacionInquilino : experience.confirmacionCasero;
  }

  confirmExperience(experience: MockExperience): void {
    if (
      this.confirmingId() !== null ||
      experience.status !== 'PENDING' ||
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

  openRating(experience: MockExperience): void {
    void this.router.navigate([this.rateExperienceRoute], {
      queryParams: { experienciaId: experience.id },
    });
  }

  setSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  setFilter(filter: ExperienceFilter): void {
    this.selectedFilter.set(filter);
  }

  navigateToSearch(): void {
    const query = this.searchTerm().trim();

    void this.router.navigate(
      [this.isTenant
        ? '/inquilino/experiencias/buscar'
        : '/casero/experiencias/buscar'],
      { queryParams: query ? { q: query } : {} },
    );
  }

}