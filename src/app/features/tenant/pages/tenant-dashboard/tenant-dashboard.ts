import { Component, inject, OnInit, signal } from '@angular/core';
import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';
import { AuthService } from '../../../../core/services/auth.service';
import { TenantHero } from '../../components/tenant-hero/tenant-hero';
import { TenantExperiences } from '../../components/tenant-experiences/tenant-experiences';
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

  readonly user = signal<UsuarioPerfil | null>(null);
  readonly isLoading = signal(true);
  readonly hasError = signal(false);

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
  }
}