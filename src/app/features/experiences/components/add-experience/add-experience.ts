
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';
import { ViviendaService } from '../../../../core/services/vivienda.service';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { ExperienciaAlquilerService } from '../../../../core/services/experiencia-alquiler.service';

import { Vivienda } from '../../../../core/models/vivienda.model';
import { UsuarioBusqueda } from '../../../../core/models/usuario-busqueda.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-experience',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-experience.html',
  styleUrl: './add-experience.css',
})
export class AddExperience implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly viviendaService = inject(ViviendaService);
  private readonly usuarioService = inject(UsuarioService);
  private readonly experienciaService = inject(ExperienciaAlquilerService);

  readonly viviendas = signal<Vivienda[]>([]);
  readonly inquilinos = signal<UsuarioBusqueda[]>([]);
  readonly cargandoViviendas = signal(false);
  readonly buscandoInquilinos = signal(false);
  readonly enviando = signal(false);
  readonly exito = signal(false);
  readonly error = signal('');
  readonly errorBusqueda = signal('');

  viviendaId: number | null = null;
  inquilinoId: number | null = null;
  terminoBusqueda = '';
  fechaInicio = '';
  fechaFin = '';

  ngOnInit(): void {
    if (this.authService.getRole() !== 'CASERO') {
      this.error.set('Solo los caseros pueden registrar una experiencia desde este formulario.');
      return;
    }

    this.cargandoViviendas.set(true);

    this.viviendaService.listarMisViviendas().subscribe({
      next: (viviendas) => {
        this.viviendas.set(viviendas);
        this.cargandoViviendas.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar tus viviendas. Inténtalo de nuevo.');
        this.cargandoViviendas.set(false);
      },
    });
  }

  buscarInquilinos(): void {
    const termino = this.terminoBusqueda.trim();

    this.errorBusqueda.set('');
    this.inquilinos.set([]);
    this.inquilinoId = null;

    if (termino.length < 2) {
      this.errorBusqueda.set('Escribe al menos dos caracteres para buscar.');
      return;
    }

    this.buscandoInquilinos.set(true);

    this.usuarioService.buscarUsuarios(termino).subscribe({
      next: (usuarios) => {
        const resultados = usuarios.filter(
          (usuario) => usuario.rol === 'INQUILINO',
        );

        this.inquilinos.set(resultados);
        this.buscandoInquilinos.set(false);

        if (resultados.length === 0) {
          this.errorBusqueda.set('No se han encontrado inquilinos con ese nombre.');
        }
      },
      error: () => {
        this.errorBusqueda.set('No se pudo realizar la búsqueda.');
        this.buscandoInquilinos.set(false);
      },
    });
  }

  registrar(): void {
    this.error.set('');
    this.exito.set(false);

    if (this.authService.getRole() !== 'CASERO') {
      this.error.set('Solo un casero puede registrar una experiencia.');
      return;
    }

    if (!this.viviendaId || !this.inquilinoId || !this.fechaInicio) {
      this.error.set('Selecciona una vivienda, un inquilino y la fecha de inicio.');
      return;
    }

    if (this.fechaFin && this.fechaFin < this.fechaInicio) {
      this.error.set('La fecha de fin no puede ser anterior a la fecha de inicio.');
      return;
    }

    this.enviando.set(true);

    this.experienciaService.registrarExperiencia({
      viviendaId: this.viviendaId,
      inquilinoId: this.inquilinoId,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin || null,
    }).subscribe({
      next: () => {
        this.exito.set(true);
        this.enviando.set(false);
        this.viviendaId = null;
        this.inquilinoId = null;
        this.terminoBusqueda = '';
        this.fechaInicio = '';
        this.fechaFin = '';
        this.inquilinos.set([]);
      },
      error: (err) => {
        this.error.set(
          err?.error?.message ??
          'No se pudo registrar la experiencia. Comprueba los datos e inténtalo de nuevo.',
        );
        this.enviando.set(false);
      },
    });
  }
}
