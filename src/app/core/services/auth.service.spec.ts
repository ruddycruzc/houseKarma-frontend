import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { UsuarioPerfil } from '../models/usuario-perfil.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('shares concurrent profile requests made by the header and dashboard', () => {
    const profile: UsuarioPerfil = {
      id: 1,
      nombre: 'Rita',
      apellidos: 'López',
      email: 'rita@example.test',
      telefono: null,
      avatar: null,
      rol: 'CASERO',
    };
    const headerResult: UsuarioPerfil[] = [];
    const dashboardResult: UsuarioPerfil[] = [];

    service.getMyProfile().subscribe((value) => headerResult.push(value));
    service.getMyProfile().subscribe((value) => dashboardResult.push(value));

    const request = httpTesting.expectOne('http://localhost:8080/api/usuarios/me');
    request.flush(profile);

    expect(headerResult).toEqual([profile]);
    expect(dashboardResult).toEqual([profile]);
  });

  it('does not retain the profile response after the concurrent request completes', () => {
    service.getMyProfile().subscribe();
    httpTesting.expectOne('http://localhost:8080/api/usuarios/me').flush({
      id: 1,
      nombre: 'Rita',
      apellidos: 'López',
      email: 'rita@example.test',
      telefono: null,
      avatar: null,
      rol: 'CASERO',
    } satisfies UsuarioPerfil);

    service.getMyProfile().subscribe();

    httpTesting.expectOne('http://localhost:8080/api/usuarios/me').flush({
      id: 1,
      nombre: 'Rita',
      apellidos: 'López',
      email: 'rita@example.test',
      telefono: null,
      avatar: null,
      rol: 'CASERO',
    } satisfies UsuarioPerfil);
  });
});
