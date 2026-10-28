import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.models';
import { UsuarioPerfil } from '../models/usuario-perfil.model';
import { ActualizarPerfilRequest } from '../models/actualizar-perfil.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api';

  register(data: RegisterRequest): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/usuarios`, data);
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data).pipe(
      tap((response) => {
        localStorage.setItem('hk_token', response.token);
        localStorage.setItem('hk_email', response.email);
        localStorage.setItem('hk_role', response.rol);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('hk_token');
    localStorage.removeItem('hk_email');
    localStorage.removeItem('hk_role');
  }

  getToken(): string | null {
    return localStorage.getItem('hk_token');
  }
  isTokenExpired(token: string): boolean {
    try {
      const payload = token.split('.')[1];

      if (!payload) {
        return true;
      }

      const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

      if (typeof decodedPayload.exp !== 'number') {
        return true;
      }

      return decodedPayload.exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token || this.isTokenExpired(token)) {
      this.logout();
      return false;
    }

    return true;
  }
  getEmail(): string | null {
    return localStorage.getItem('hk_email');
  }

  getRole(): string | null {
    return localStorage.getItem('hk_role');
  }

  getMyProfile(): Observable<UsuarioPerfil> {
    return this.http.get<UsuarioPerfil>(`${this.apiUrl}/usuarios/me`);
  }

  updateMyProfile(data: ActualizarPerfilRequest): Observable<UsuarioPerfil> {
    return this.http.patch<UsuarioPerfil>(`${this.apiUrl}/usuarios/me`, data);
  }
}
