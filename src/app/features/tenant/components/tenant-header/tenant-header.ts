import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';

@Component({
  selector: 'app-tenant-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './tenant-header.html',
  styleUrl: './tenant-header.css',
})
export class TenantHeader implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isMenuOpen = false;

  readonly user = signal<UsuarioPerfil | null>(null);
  readonly isLoadingProfile = signal(true);
  readonly profileError = signal(false);

  get fullName(): string {
    const profile = this.user();

    if (!profile) {
      return '';
    }

    return `${profile.nombre} ${profile.apellidos}`.trim();
  }

  get initials(): string {
    const profile = this.user();

    if (!profile) {
      return '';
    }

    return `${profile.nombre.charAt(0)}${profile.apellidos.charAt(0)}`.toUpperCase();
  }
  ngOnInit(): void {
    this.authService.getMyProfile().subscribe({
      next: (profile) => {
        this.user.set(profile);
        this.isLoadingProfile.set(false);
      },
      error: (error) => {
        console.error('Error al cargar el perfil del encabezado:', error);
        this.profileError.set(true);
        this.isLoadingProfile.set(false);
      },
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onMenuKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  logout(): void {
    this.authService.logout();
    this.closeMenu();
    void this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (!target.closest('app-tenant-header')) {
      this.closeMenu();
    }
  }
}
