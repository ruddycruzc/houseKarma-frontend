import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ValoracionRequest,
  ValoracionResponse,
} from '../models/valoracion-model';

@Injectable({
  providedIn: 'root',
})
export class ValoracionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/valoraciones';

  registrar(
    experienciaId: number,
    request: ValoracionRequest,
  ): Observable<ValoracionResponse> {
    return this.http.post<ValoracionResponse>(
      `${this.apiUrl}/experiencias/${experienciaId}`,
      request,
    );
  }

  obtenerPorUsuario(usuarioId: number): Observable<ValoracionResponse[]> {
    return this.http.get<ValoracionResponse[]>(
      `${this.apiUrl}/usuarios/${usuarioId}`,
    );
  }

  obtenerMedia(usuarioId: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/usuarios/${usuarioId}/media`,
    );
  }

  contarPorUsuario(usuarioId: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/usuarios/${usuarioId}/total`,
    );
  }
}