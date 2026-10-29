import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ExperienciaAlquiler,
  ExperienciaAlquilerPendiente,
  ExperienciaAlquilerResponse,
} from '../models/experiencia-alquiler.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienciaAlquilerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/experiencias';

  obtenerMisExperiencias(): Observable<ExperienciaAlquiler[]> {
    return this.http.get<ExperienciaAlquiler[]>(`${this.apiUrl}/mis-experiencias`);
  }

  obtenerPendientesCasero(): Observable<ExperienciaAlquilerPendiente[]> {
    return this.http.get<ExperienciaAlquilerPendiente[]>(`${this.apiUrl}/pendientes/casero`);
  }

  confirmarExperiencia(id: number): Observable<unknown> {
    return this.http.patch(`${this.apiUrl}/${id}/confirmacion`, {});
  }
  registrarExperiencia(request: {
    viviendaId: number;
    inquilinoId: number | null;
    fechaInicio: string;
    fechaFin: string | null;
  }): Observable<ExperienciaAlquilerResponse> {
    return this.http.post<ExperienciaAlquilerResponse>(this.apiUrl, request);
  }
}
