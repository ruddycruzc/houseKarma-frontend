import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { UsuarioPerfil } from '../../core/models/usuario-perfil.model';
import { ActualizarPerfilRequest } from '../../core/models/actualizar-perfil.model';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile implements OnInit {
  private readonly authService = inject(AuthService);

  readonly profile = signal<UsuarioPerfil | null>(null);

  form = {
    nombre: '',
    apellidos: '',
    telefono: '',
    avatar: '',
  };

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly editing = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');

  ngOnInit(): void {
    this.loadProfile();
  }

  get role(): 'tenant' | 'landlord' | 'admin' {
    switch (this.profile()?.rol) {
      case 'INQUILINO':
        return 'tenant';
      case 'CASERO':
        return 'landlord';
      default:
        return 'admin';
    }
  }

  get roleLabel(): string {
    switch (this.profile()?.rol) {
      case 'INQUILINO':
        return 'Inquilino';
      case 'CASERO':
        return 'Casero';
      default:
        return 'Administrador';
    }
  }

  get initials(): string {
    const profile = this.profile();

    if (!profile) return '';

    return `${profile.nombre.charAt(0)}${profile.apellidos.charAt(0)}`.toUpperCase();
  }

  loadProfile(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.getMyProfile().subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.fillForm(profile);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(
          'No se pudo cargar tu perfil. Comprueba tu sesión e inténtalo de nuevo.',
        );
        this.loading.set(false);
      },
    });
  }

  startEditing(): void {
    const profile = this.profile();

    if (!profile) return;

    this.fillForm(profile);
    this.editing.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  cancelEditing(): void {
    const profile = this.profile();

    if (profile) {
      this.fillForm(profile);
    }

    this.editing.set(false);
    this.errorMessage.set('');
  }

  saveProfile(): void {
    const profile = this.profile();

    if (this.saving() || !profile) return;

    const nombre = this.form.nombre.trim();
    const apellidos = this.form.apellidos.trim();

    if (!nombre || !apellidos) {
      this.errorMessage.set(
        'El nombre y los apellidos son obligatorios.',
      );
      return;
    }

    const request: ActualizarPerfilRequest = {
      nombre,
      apellidos,
      telefono: this.form.telefono.trim() || null,
      avatar: this.form.avatar.trim() || null,
    };

    this.saving.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService.updateMyProfile(request).subscribe({
      next: (updatedProfile) => {
        this.profile.set(updatedProfile);
        this.fillForm(updatedProfile);
        this.editing.set(false);
        this.saving.set(false);
        this.successMessage.set(
          'Tu perfil se ha actualizado correctamente.',
        );
      },
      error: (error) => {
        this.saving.set(false);

        if (error.status === 400) {
          this.errorMessage.set(
            'Revisa los datos introducidos y sus longitudes.',
          );
        } else if (error.status === 401) {
          this.errorMessage.set(
            'Tu sesión ha caducado. Inicia sesión de nuevo.',
          );
        } else {
          this.errorMessage.set(
            'No se pudieron guardar los cambios. Inténtalo de nuevo.',
          );
        }
      },
    });
  }

  private fillForm(profile: UsuarioPerfil): void {
    this.form = {
      nombre: profile.nombre,
      apellidos: profile.apellidos,
      telefono: profile.telefono ?? '',
      avatar: profile.avatar ?? '',
    };
  }
}