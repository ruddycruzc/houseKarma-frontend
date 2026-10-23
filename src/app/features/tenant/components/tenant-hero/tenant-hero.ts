import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';

@Component({
  selector: 'app-tenant-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tenant-hero.html',
  styleUrl: './tenant-hero.css',
})
export class TenantHero {
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