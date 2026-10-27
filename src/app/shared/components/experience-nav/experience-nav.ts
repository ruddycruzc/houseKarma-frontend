import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-experience-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './experience-nav.html',
  styleUrl: './experience-nav.css',
})
export class ExperienceNav {
  private readonly authService = inject(AuthService);

  readonly role = this.authService.getRole();

  readonly isTenant = this.role === 'INQUILINO';
  readonly isLandlord = this.role === 'CASERO';

  readonly profileRoute = this.isTenant
    ? '/inquilino/perfil'
    : '/casero/perfil';

  readonly experiencesRoute = this.isTenant
    ? '/inquilino/experiencias'
    : '/casero/experiencias';

  readonly rateExperienceRoute = this.isTenant
    ? '/inquilino/experiencias/valorar'
    : '/casero/experiencias/valorar';
}