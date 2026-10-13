import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-tenant-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl:'./tenant-header.html',
  styleUrl: './tenant-header.css',
})
export class TenantHeader {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isMenuOpen = false;

  user = {
    fullName: 'Lucía Martínez',
    initials: 'LM',
  };

  toggleMenu(): void {
    this.isMenuOpen= !this.isMenuOpen;
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
