
import { Component, input } from '@angular/core';

export type ExperienceStatus = 'ACTIVA' | 'FINALIZADA' | 'VALORADA';

export interface TenantExperience {
  id: number;
  property: string;
  location: string;
  landlord: string;
  startDate: string;
  endDate: string | null;
  status: ExperienceStatus;
}

@Component({
  selector: 'app-tenant-experiences',
  standalone: true,
  imports: [],
  templateUrl: './tenant-experiences.html',
  styleUrl: './tenant-experiences.css',
})
export class TenantExperiences {
  readonly experiences = input<TenantExperience[]>([]);

  protected formatDate(date: string | null): string {
    if (!date) return 'Sin finalizar';

    const parsedDate = new Date(`${date}T12:00:00`);

    if (Number.isNaN(parsedDate.getTime())) return date;

    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(parsedDate);
  }

  protected statusLabel(status: ExperienceStatus): string {
    const labels: Record<ExperienceStatus, string> = {
      ACTIVA: 'Activa',
      FINALIZADA: 'Finalizada',
      VALORADA: 'Valorada',
    };

    return labels[status];
  }
}
