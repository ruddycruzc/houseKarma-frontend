import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';

import { AuthService } from '../../../../core/services/auth.service';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { UsuarioBusqueda } from '../../../../core/models/usuario-busqueda.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './user-search.html',
  styleUrl: './user-search.css',
})
export class UserSearch {
  private readonly authService = inject(AuthService);
  private readonly usuarioService = inject(UsuarioService);

  private searchSubscription?: Subscription;

  readonly role = this.authService.getRole() === 'CASERO' ? 'landlord' : 'tenant';

  readonly termino = signal('');
  readonly resultados = signal<UsuarioBusqueda[]>([]);
  readonly cargando = signal(false);
  readonly error = signal(false);
  readonly buscando = signal(false);

  buscarUsuarios(): void {
    const termino = this.termino().trim();

    if (!termino || this.cargando()) return;

    this.searchSubscription?.unsubscribe();

    this.cargando.set(true);
    this.error.set(false);
    this.buscando.set(true);
    this.resultados.set([]);

    this.searchSubscription = this.usuarioService
      .buscarUsuarios(termino)
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: (usuarios) => this.resultados.set(usuarios),
        error: () => this.error.set(true),
      });
  }
}
