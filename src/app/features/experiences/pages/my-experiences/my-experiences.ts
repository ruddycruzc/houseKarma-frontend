import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ExperienceNav } from '../../../../shared/components/experience-nav/experience-nav';

type ExperienceStatus = 'ACTIVE' | 'PENDING' | 'CONFIRMED' | 'FINISHED';

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
  endDate: string;
  status: ExperienceStatus;
  rated: boolean;
  recent: boolean;
  description: string;
}

@Component({
  selector: 'app-my-experiences',
  standalone: true,
  imports: [RouterLink, ExperienceNav],
  templateUrl: './my-experiences.html',
  styleUrl: './my-experiences.css',
})
export class MyExperiences {
  private readonly authService = inject(AuthService);

  readonly role = this.authService.getRole();
  readonly isTenant = this.role === 'INQUILINO';

  readonly searchTerm = signal('');
  readonly appliedSearch = signal('');
  readonly filterOpen = signal(false);
  readonly selectedFilter = signal<ExperienceFilter>('ALL');

  // Datos ficticios para desarrollar la interfaz.
  // Se sustituirán por la respuesta del backend.
  readonly experiences = signal<MockExperience[]>([
    {
      id: 1,
      tenantName: 'Laura Fernández',
      tenantInitials: 'LF',
      landlordName: 'Álvaro Díaz',
      landlordInitials: 'AD',
      propertyName: 'Apartamento en Oviedo',
      city: 'Oviedo',
      startDate: '01/03/2026',
      endDate: 'Actualidad',
      status: 'ACTIVE',
      rated: false,
      recent: true,
      description: 'El alquiler está actualmente en curso.',
    },
    {
      id: 2,
      tenantName: 'Laura Fernández',
      tenantInitials: 'LF',
      landlordName: 'María García',
      landlordInitials: 'MG',
      propertyName: 'Piso en Gijón',
      city: 'Gijón',
      startDate: '01/06/2025',
      endDate: '31/05/2026',
      status: 'PENDING',
      rated: false,
      recent: true,
      description: 'La experiencia está pendiente de confirmación.',
    },
    {
      id: 3,
      tenantName: 'Carlos López',
      tenantInitials: 'CL',
      landlordName: 'Elena Martín',
      landlordInitials: 'EM',
      propertyName: 'Apartamento en Gijón',
      city: 'Gijón',
      startDate: '01/02/2025',
      endDate: '31/01/2026',
      status: 'CONFIRMED',
      rated: false,
      recent: false,
      description: 'La experiencia está confirmada por ambas partes.',
    },
    {
      id: 4,
      tenantName: 'Laura Fernández',
      tenantInitials: 'LF',
      landlordName: 'Nuria Soler',
      landlordInitials: 'NS',
      propertyName: 'Estudio en Santander',
      city: 'Santander',
      startDate: '01/09/2023',
      endDate: '31/08/2024',
      status: 'FINISHED',
      rated: false,
      recent: false,
      description: 'El alquiler ha finalizado. Puedes valorar la experiencia.',
    },
    {
      id: 5,
      tenantName: 'Carlos López',
      tenantInitials: 'CL',
      landlordName: 'María García',
      landlordInitials: 'MG',
      propertyName: 'Piso en Avilés',
      city: 'Avilés',
      startDate: '01/09/2022',
      endDate: '31/08/2023',
      status: 'FINISHED',
      rated: true,
      recent: false,
      description: 'Esta experiencia ya ha sido valorada.',
    },
  ]);
  readonly rateExperienceRoute = this.isTenant
  ? '/inquilino/experiencias/valorar'
  : '/casero/experiencias/valorar';

  readonly otherPersonRole = this.isTenant ? 'Casero' : 'Inquilino';

  readonly totalCount = computed(() => this.experiences().length);

  readonly recentCount = computed(
    () => this.experiences().filter((experience) => experience.recent).length,
  );

  readonly activeCount = computed(
    () =>
      this.experiences().filter((experience) => experience.status === 'ACTIVE')
        .length,
  );

  readonly pendingCount = computed(
    () =>
      this.experiences().filter((experience) => experience.status === 'PENDING')
        .length,
  );

  readonly finishedCount = computed(
    () =>
      this.experiences().filter((experience) => experience.status === 'FINISHED')
        .length,
  );

  readonly ratedCount = computed(
    () => this.experiences().filter((experience) => experience.rated).length,
  );

  readonly activeExperiences = computed(() =>
    this.filterExperiences().filter(
      (experience) => experience.status === 'ACTIVE',
    ),
  );

  readonly pendingExperiences = computed(() =>
    this.filterExperiences().filter(
      (experience) =>
        experience.status === 'PENDING' ||
        experience.status === 'CONFIRMED',
    ),
  );

  readonly finishedExperiences = computed(() =>
    this.filterExperiences().filter(
      (experience) => experience.status === 'FINISHED',
    ),
  );

  readonly featuredExperience = computed(
    () =>
      this.experiences().find(
        (experience) => experience.status === 'PENDING',
      ) ?? null,
  );

  readonly featuredTitle = computed(() =>
    this.isTenant
      ? 'Hay una experiencia pendiente de tu atención.'
      : 'Hay una experiencia pendiente de confirmación.',
  );

  readonly featuredDescription = computed(() => {
    const experience = this.featuredExperience();

    if (!experience) {
      return 'Aquí aparecerán las experiencias que necesiten tu atención.';
    }

    const person = this.otherPersonName(experience);

    return this.isTenant
      ? `Revisa la experiencia registrada con ${person} y comprueba su estado.`
      : `Revisa la experiencia registrada con ${person} y comprueba los datos antes de continuar.`;
  });

  statusLabel(status: ExperienceStatus): string {
    const labels: Record<ExperienceStatus, string> = {
      ACTIVE: 'Activa',
      PENDING: 'Pendiente de confirmación',
      CONFIRMED: 'Confirmada',
      FINISHED: 'Finalizada',
    };

    return labels[status];
  }

  otherPersonName(experience: MockExperience): string {
    return this.isTenant ? experience.landlordName : experience.tenantName;
  }

  otherPersonInitials(experience: MockExperience): string {
    return this.isTenant
      ? experience.landlordInitials
      : experience.tenantInitials;
  }

  applyFilter(): void {
    this.appliedSearch.set(this.searchTerm().trim().toLocaleLowerCase());
  }

  toggleFilter(): void {
    this.filterOpen.update((open) => !open);
  }

  setFilter(filter: ExperienceFilter): void {
    this.selectedFilter.set(filter);
  }

  private filterExperiences(): MockExperience[] {
    const search = this.appliedSearch();
    const selectedFilter = this.selectedFilter();

    return this.experiences().filter((experience) => {
      const personName = this.otherPersonName(experience).toLocaleLowerCase();

      const matchesSearch =
        !search ||
        personName.includes(search) ||
        experience.propertyName.toLocaleLowerCase().includes(search) ||
        experience.city.toLocaleLowerCase().includes(search);

      const matchesFilter =
        selectedFilter === 'ALL' ||
        (selectedFilter === 'ACTIVE' && experience.status === 'ACTIVE') ||
        (selectedFilter === 'PENDING' &&
          (experience.status === 'PENDING' ||
            experience.status === 'CONFIRMED')) ||
        (selectedFilter === 'FINISHED' &&
          experience.status === 'FINISHED');

      return matchesSearch && matchesFilter;
    });
  }
}