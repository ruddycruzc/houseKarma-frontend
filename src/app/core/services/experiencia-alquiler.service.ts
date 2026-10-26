import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ExperienciaAlquilerPendiente } from '../models/experiencia-alquiler.model';

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
}