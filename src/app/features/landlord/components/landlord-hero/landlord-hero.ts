import { Component, input } from '@angular/core';
import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';

@Component({
  selector: 'app-landlord-hero',
  standalone: true,
  templateUrl: './landlord-hero.html',
  styleUrl: './landlord-hero.css',
})
export class LandlordHero {
  readonly user = input.required<UsuarioPerfil>();

  get fullName(): string {
    const profile = this.user();
    return `${profile.nombre} ${profile.apellidos}`.trim();
  }

  get initials(): string {
    const profile = this.user();

    return `${profile.nombre.charAt(0)}${profile.apellidos.charAt(0)}`
      .toUpperCase();
  }
}