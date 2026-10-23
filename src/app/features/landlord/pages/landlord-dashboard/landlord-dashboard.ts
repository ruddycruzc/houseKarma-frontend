import { Component, inject, OnInit } from '@angular/core';
import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';
import { AuthService } from '../../../../core/services/auth.service';
import { LandlordHero } from '../../components/landlord-hero/landlord-hero';

@Component({
  selector: 'app-landlord-dashboard',
  standalone: true,
  imports: [LandlordHero],
  templateUrl: './landlord-dashboard.html',
  styleUrl: './landlord-dashboard.css',
})
export class LandlordDashboard implements OnInit {
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