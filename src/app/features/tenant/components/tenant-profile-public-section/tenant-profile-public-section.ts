import { Component, input } from '@angular/core';
import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tenant-profile-public-section',
  imports: [RouterLink],
  templateUrl: './tenant-profile-public-section.html',
  styleUrl: './tenant-profile-public-section.css',
})
export class TenantProfilePublicSection {
  readonly user = input.required<UsuarioPerfil>();

  get fullName(): string {
    const profile = this.user();
    return `${profile.nombre} ${profile.apellidos}`.trim();
  }

  get initials(): string {
    const profile = this.user();
    return `${profile.nombre.charAt(0)}${profile.apellidos.charAt(0)}`.toUpperCase();
  }
}
