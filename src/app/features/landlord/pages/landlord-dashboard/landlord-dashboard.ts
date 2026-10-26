import { Component, inject, OnInit } from '@angular/core';
import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';
import { ExperienciaAlquilerPendiente } from '../../../../core/models/experiencia-alquiler.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ExperienciaAlquilerService } from '../../../../core/services/experiencia-alquiler.service';
import { LandlordHero } from '../../components/landlord-hero/landlord-hero';
import {
  LandlordPendingExperience,
  PendingExperienceViewModel,
} from '../../components/landlord-pending-experience/landlord-pending-experience';

@Component({
  selector: 'app-landlord-dashboard',
  standalone: true,
  imports: [LandlordHero, LandlordPendingExperience],
  templateUrl: './landlord-dashboard.html',
  styleUrl: './landlord-dashboard.css',
})
export class LandlordDashboard implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly experienciaService = inject(ExperienciaAlquilerService);

  user: UsuarioPerfil | null = null;
  isLoading = true;
  hasError = false;

  pendingExperiences: PendingExperienceViewModel[] = [];
  isExperiencesLoading = true;
  experiencesError = false;

  ngOnInit(): void {
    this.loadProfile();
    this.loadPendingExperiences();
  }

  private loadProfile(): void {
    this.authService.getMyProfile().subscribe({
      next: (profile) => {
        this.user = profile;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  private loadPendingExperiences(): void {
    this.experienciaService.obtenerPendientesCasero().subscribe({
      next: (experiences) => {
        this.pendingExperiences = experiences.map((experience) => this.toViewModel(experience));
        this.isExperiencesLoading = false;
      },
      error: () => {
        this.experiencesError = true;
        this.isExperiencesLoading = false;
      },
    });
  }

  private toViewModel(experience: ExperienciaAlquilerPendiente): PendingExperienceViewModel {
    const propertyName = [
      experience.viviendaDireccion,
      experience.viviendaNumero,
      experience.viviendaComplemento,
    ]
      .filter((part) => part?.trim())
      .join(', ');

    const propertyLocation = [
      experience.viviendaCodigoPostal,
      experience.viviendaLocalidad,
      experience.viviendaProvincia,
    ]
      .filter((part) => part?.trim())
      .join(', ');

    return {
      id: experience.id,
      tenantName: [experience.inquilinoNombre, experience.inquilinoApellidos]
        .filter((part) => part?.trim())
        .join(' '),
      propertyName,
      propertyLocation,
      experienceDateLabel: this.formatDate(experience.fechaInicio),
    };
  }

  private formatDate(date: string): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  }
}
