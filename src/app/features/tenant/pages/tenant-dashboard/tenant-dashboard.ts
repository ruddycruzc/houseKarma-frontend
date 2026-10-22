import { Component, inject, OnInit } from '@angular/core';
import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';
import { AuthService } from '../../../../core/services/auth.service';
import { TenantHero } from '../../components/tenant-hero/tenant-hero';

@Component({
  selector: 'app-tenant-dashboard',
  standalone: true,
  imports: [TenantHero],
  templateUrl: './tenant-dashboard.html',
  styleUrl: './tenant-dashboard.css',
})
export class TenantDashboard implements OnInit {
  private readonly authService = inject(AuthService);

  user: UsuarioPerfil | null = null;
  isLoading = true;
  hasError = false;

  ngOnInit(): void {
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
}