import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vivienda } from '../models/vivienda.model';

@Injectable({
  providedIn: 'root',
})
export class ViviendaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/viviendas';

  listarTodas(): Observable<Vivienda[]> {
    return this.http.get<Vivienda[]>(this.apiUrl);
  }
  listarMisViviendas(): Observable<Vivienda[]> {
  return this.http.get<Vivienda[]>(`${this.apiUrl}/mis-viviendas`);
}
}