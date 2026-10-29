
import { Component, input } from '@angular/core';
import { EstadoExperiencia } from '../../../../core/models/experiencia-alquiler.model';

export type ExperienceStatus = EstadoExperiencia;

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
  readonly loading = input(false);
  readonly hasError = input(false);

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
      PENDIENTE_CONFIRMACION: 'Pendiente de confirmación',
      CONFIRMADA: 'Confirmada',
      FINALIZADA: 'Finalizada',
      CANCELADA: 'Cancelada',
    };

    return labels[status];
  }
}
