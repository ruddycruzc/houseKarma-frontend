
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UsuarioBusqueda } from '../models/usuario-busqueda.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/usuarios';

  buscarUsuarios(termino: string): Observable<UsuarioBusqueda[]> {
    const params = new HttpParams().set('termino', termino.trim());

    return this.http.get<UsuarioBusqueda[]>(
      `${this.apiUrl}/buscar-usuarios`,
      { params },
    );
  }
}
