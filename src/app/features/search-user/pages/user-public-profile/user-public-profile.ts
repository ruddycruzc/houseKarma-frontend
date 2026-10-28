import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../../../core/services/auth.service';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { UsuarioPublico } from '../../../../core/models/usuario-publico.model';

@Component({
  selector: 'app-user-public-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-public-profile.html',
  styleUrl: './user-public-profile.css',
})
export class UserPublicProfile {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly usuarioService = inject(UsuarioService);

  readonly role = this.authService.getRole() === 'CASERO'
    ? 'landlord'
    : 'tenant';

  readonly user = signal<UsuarioPublico | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (!Number.isInteger(id) || id <= 0) {
        this.loading.set(false);
        this.error.set(true);
        return;
      }

      this.loading.set(true);
      this.error.set(false);
      this.user.set(null);

      this.usuarioService.obtenerPerfilPublico(id)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: (user) => this.user.set(user),
          error: () => this.error.set(true),
        });
    });
  }

  get roleLabel(): string {
    return this.user()?.rol === 'CASERO' ? 'Casero' : 'Inquilino';
  }

  get initials(): string {
    const user = this.user();

    return user
      ? `${user.nombre.charAt(0)}${user.apellidos.charAt(0)}`.toUpperCase()
      : '';
  }

  get backRoute(): string {
    return this.role === 'landlord'
      ? '/casero/buscar-usuarios'
      : '/inquilino/buscar-usuarios';
  }
}