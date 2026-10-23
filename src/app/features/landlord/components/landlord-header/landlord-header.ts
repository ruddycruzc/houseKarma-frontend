import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';

@Component({
  selector: 'app-landlord-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './landlord-header.html',
  styleUrl: './landlord-header.css',
})
export class LandlordHeader implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isMenuOpen = false;

  user: UsuarioPerfil | null = null;
  isLoadingProfile = true;
  profileError = false;

  get fullName(): string {
    if (!this.user) {
      return '';
    }

    return `${this.user.nombre} ${this.user.apellidos}`.trim();
  }

  get initials(): string {
    if (!this.user) {
      return '';
    }

    return `${this.user.nombre.charAt(0)}${this.user.apellidos.charAt(0)}`
      .toUpperCase();
  }

  ngOnInit(): void {
    this.authService.getMyProfile().subscribe({
      next: (profile) => {
        this.user = profile;
        this.isLoadingProfile = false;
      },
      error: () => {
        this.profileError = true;
        this.isLoadingProfile = false;
      },
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeMenu();
    void this.router.navigate(['/login']);
  }
}