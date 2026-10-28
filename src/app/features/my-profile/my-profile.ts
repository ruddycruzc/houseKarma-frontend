import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { UsuarioPerfil } from '../../core/models/usuario-perfil.model';
import { ActualizarPerfilRequest } from '../../core/models/actualizar-perfil.model';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile implements OnInit {
  private readonly authService = inject(AuthService);

  profile: UsuarioPerfil | null = null;

  form = {
    nombre: '',
    apellidos: '',
    telefono: '',
    avatar: '',
  };

  loading = true;
  saving = false;
  editing = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadProfile();
  }

  get role(): 'tenant' | 'landlord' | 'admin' {
    switch (this.profile?.rol) {
      case 'INQUILINO':
        return 'tenant';
      case 'CASERO':
        return 'landlord';
      default:
        return 'admin';
    }
  }

  get roleLabel(): string {
    switch (this.profile?.rol) {
      case 'INQUILINO':
        return 'Inquilino';
      case 'CASERO':
        return 'Casero';
      default:
        return 'Administrador';
    }
  }

  get initials(): string {
    if (!this.profile) return '';

    return `${this.profile.nombre.charAt(0)}${this.profile.apellidos.charAt(0)}`
      .toUpperCase();
  }

  loadProfile(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authService.getMyProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.fillForm(profile);
        this.loading = false;
      },
      error: () => {
        this.errorMessage =
          'No se pudo cargar tu perfil. Comprueba tu sesión e inténtalo de nuevo.';
        this.loading = false;
      },
    });
  }

  startEditing(): void {
    if (!this.profile) return;

    this.fillForm(this.profile);
    this.editing = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEditing(): void {
    if (this.profile) this.fillForm(this.profile);

    this.editing = false;
    this.errorMessage = '';
  }

  saveProfile(): void {
    if (this.saving || !this.profile) return;

    const nombre = this.form.nombre.trim();
    const apellidos = this.form.apellidos.trim();

    if (!nombre || !apellidos) {
      this.errorMessage = 'El nombre y los apellidos son obligatorios.';
      return;
    }

    const request: ActualizarPerfilRequest = {
      nombre,
      apellidos,
      telefono: this.form.telefono.trim() || null,
      avatar: this.form.avatar.trim() || null,
    };

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.updateMyProfile(request).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.fillForm(profile);
        this.editing = false;
        this.saving = false;
        this.successMessage = 'Tu perfil se ha actualizado correctamente.';
      },
      error: (error) => {
        this.saving = false;

        if (error.status === 400) {
          this.errorMessage =
            'Revisa los datos introducidos y sus longitudes.';
        } else if (error.status === 401) {
          this.errorMessage =
            'Tu sesión ha caducado. Inicia sesión de nuevo.';
        } else {
          this.errorMessage =
            'No se pudieron guardar los cambios. Inténtalo de nuevo.';
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