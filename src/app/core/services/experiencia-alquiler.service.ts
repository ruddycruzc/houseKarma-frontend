import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ExperienciaAlquilerPendiente,
  ExperienciaAlquilerListado,
} from '../models/experiencia-alquiler.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienciaAlquilerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/experiencias';

  obtenerPendientesCasero(): Observable<ExperienciaAlquilerPendiente[]> {
    return this.http.get<ExperienciaAlquilerPendiente[]>(
      `${this.apiUrl}/pendientes/casero`,
    );
  }

  obtenerMisExperiencias(): Observable<ExperienciaAlquilerListado[]> {
    return this.http.get<ExperienciaAlquilerListado[]>(
      `${this.apiUrl}/mis-experiencias`,
    );
  }
}