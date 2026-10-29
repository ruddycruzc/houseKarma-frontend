import { Component, inject, OnInit, signal } from '@angular/core';
import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';
import { ExperienciaAlquiler } from '../../../../core/models/experiencia-alquiler.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ExperienciaAlquilerService } from '../../../../core/services/experiencia-alquiler.service';
import { TenantHero } from '../../components/tenant-hero/tenant-hero';
import {
  TenantExperience,
  TenantExperiences,
} from '../../components/tenant-experiences/tenant-experiences';
import { TenantProfilePublicSection } from '../../components/tenant-profile-public-section/tenant-profile-public-section';

@Component({
  selector: 'app-tenant-dashboard',
  standalone: true,
  imports: [TenantHero, TenantExperiences, TenantProfilePublicSection],
  templateUrl: './tenant-dashboard.html',
  styleUrl: './tenant-dashboard.css',
})
export class TenantDashboard implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly experienciaService = inject(ExperienciaAlquilerService);

  readonly user = signal<UsuarioPerfil | null>(null);
  readonly isLoading = signal(true);
  readonly hasError = signal(false);
  readonly experiences = signal<TenantExperience[]>([]);
  readonly isExperiencesLoading = signal(true);
  readonly hasExperiencesError = signal(false);

  ngOnInit(): void {
    this.authService.getMyProfile().subscribe({
      next: (profile) => {
        this.user.set(profile);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar el perfil del dashboard:', error);
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });

    this.experienciaService.obtenerMisExperiencias().subscribe({
      next: (experiences) => {
        this.experiences.set(experiences.map((experience) => this.toTenantExperience(experience)));
        this.isExperiencesLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar las experiencias del dashboard:', error);
        this.hasExperiencesError.set(true);
        this.isExperiencesLoading.set(false);
      },
    });
  }

  private toTenantExperience(experience: ExperienciaAlquiler): TenantExperience {
    return {
      id: experience.id,
      property: [
        experience.viviendaDireccion,
        experience.viviendaNumero,
        experience.viviendaComplemento,
      ]
        .filter((part) => part?.trim())
        .join(', '),
      location: [experience.viviendaLocalidad, experience.viviendaProvincia]
        .filter((part) => part?.trim())
        .join(', '),
      landlord: [experience.caseroNombre, experience.caseroApellidos]
        .filter((part) => part?.trim())
        .join(' '),
      startDate: experience.fechaInicio,
      endDate: experience.fechaFin,
      status: experience.estado,
    };
  }
}