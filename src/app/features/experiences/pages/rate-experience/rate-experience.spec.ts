import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { Observable, of, Subject, throwError } from 'rxjs';
import { vi } from 'vitest';

import { ExperienciaAlquiler } from '../../../../core/models/experiencia-alquiler.model';
import { ValoracionRequest, ValoracionResponse } from '../../../../core/models/valoracion-model';
import { AuthService } from '../../../../core/services/auth.service';
import { ExperienciaAlquilerService } from '../../../../core/services/experiencia-alquiler.service';
import { ValoracionService } from '../../../../core/services/valoracion.service';
import { RateExperience } from './rate-experience';

const finishedExperience: ExperienciaAlquiler = {
  id: 12,
  viviendaId: 8,
  viviendaDireccion: 'Calle Luna',
  viviendaNumero: '8',
  viviendaComplemento: null,
  viviendaLocalidad: 'Madrid',
  viviendaCodigoPostal: '28002',
  viviendaProvincia: 'Madrid',
  inquilinoId: 3,
  inquilinoNombre: 'Noa',
  inquilinoApellidos: 'Ruiz',
  caseroId: 1,
  caseroNombre: 'Rita',
  caseroApellidos: 'López',
  fechaInicio: '2024-01-01',
  fechaFin: '2024-12-31',
  estado: 'FINALIZADA',
  confirmacionInquilino: true,
  confirmacionCasero: true,
  fechaRegistro: '2024-01-02T12:00:00',
};

const pendingExperience: ExperienciaAlquiler = {
  ...finishedExperience,
  estado: 'CONFIRMADA',
};

const publishedRating: ValoracionResponse = {
  id: 1,
  experienciaId: 12,
  autorId: 1,
  autorNombre: 'Rita López',
  destinatarioId: 3,
  destinatarioNombre: 'Noa Ruiz',
  puntuacion: 5,
  comentario: null,
  fechaRegistro: '2025-01-01T12:00:00',
};

describe('RateExperience', () => {
  async function createComponent(
    role: 'INQUILINO' | 'CASERO',
    experiences: ExperienciaAlquiler[] = [finishedExperience],
    ratingRequest = vi.fn((_id: number, _request: ValoracionRequest) => of(publishedRating)),
    experienceId = '12',
  ): Promise<{
    component: RateExperience;
    fixture: ComponentFixture<RateExperience>;
    ratingRequest: typeof ratingRequest;
  }> {
    await TestBed.configureTestingModule({
      imports: [RateExperience],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(convertToParamMap({ experienciaId: experienceId })),
          },
        },
        { provide: AuthService, useValue: { getRole: () => role } },
        {
          provide: ExperienciaAlquilerService,
          useValue: { obtenerMisExperiencias: () => of(experiences) },
        },
        {
          provide: ValoracionService,
          useValue: { registrar: ratingRequest },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(RateExperience);
    fixture.detectChanges();
    await fixture.whenStable();

    return { component: fixture.componentInstance, fixture, ratingRequest };
  }

  it('loads the selected finished experience and displays the landlord rating form', async () => {
    const { component, fixture } = await createComponent('CASERO');

    expect(component.experienceReady()).toBe(true);
    expect(component.personName).toBe('Noa Ruiz');
    expect(component.criteria.map((criterion) => criterion.id)).toEqual([
      'COMUNICACION',
      'CUIDADO_VIVIENDA',
      'CUMPLIMIENTO_ACUERDOS',
      'GESTION_INCIDENCIAS',
      'RESPETO',
    ]);
    expect(fixture.nativeElement.textContent).toContain('Calle Luna, 8');
    expect(fixture.nativeElement.querySelectorAll('fieldset').length).toBe(5);
  });

  it('uses the tenant criteria and identifies the landlord as the recipient', async () => {
    const { component } = await createComponent('INQUILINO');

    expect(component.personName).toBe('Rita López');
    expect(component.personRoleLabel).toBe('Casero');
    expect(component.criteria.map((criterion) => criterion.id)).toEqual([
      'COMUNICACION',
      'TRANSPARENCIA',
      'MANTENIMIENTO',
      'FIANZA',
      'RESPETO',
    ]);
  });

  it('does not render a rating form for a non-final experience', async () => {
    const { component, fixture } = await createComponent('CASERO', [pendingExperience]);

    expect(component.experienceReady()).toBe(false);
    expect(component.errorMessage()).toContain('Solo puedes valorar experiencias finalizadas');
    expect(fixture.nativeElement.querySelector('form')).toBeNull();
  });

  it('submits the selected experience id and the backend criteria, then shows success', async () => {
    const { component, fixture, ratingRequest } = await createComponent('CASERO');
    component.criteria.forEach((criterion) => component.setRating(criterion.id, 4));
    component.comment.set('Buena experiencia');
    component.previewRating();
    component.publishRating();
    fixture.detectChanges();

    expect(ratingRequest).toHaveBeenCalledWith(12, {
      criterios: [
        { criterio: 'COMUNICACION', puntuacion: 4 },
        { criterio: 'CUIDADO_VIVIENDA', puntuacion: 4 },
        { criterio: 'CUMPLIMIENTO_ACUERDOS', puntuacion: 4 },
        { criterio: 'GESTION_INCIDENCIAS', puntuacion: 4 },
        { criterio: 'RESPETO', puntuacion: 4 },
      ],
      comentario: 'Buena experiencia',
    });
    expect(fixture.nativeElement.textContent).toContain('¡Valoración publicada!');
  });

  it('prevents a second submission while the first request is pending', async () => {
    const response = new Subject<ValoracionResponse>();
    const registerRating = vi.fn(
      (_id: number, _request: ValoracionRequest): Observable<ValoracionResponse> => response,
    );
    const { component } = await createComponent('CASERO', [finishedExperience], registerRating);
    component.criteria.forEach((criterion) => component.setRating(criterion.id, 5));

    component.publishRating();
    component.publishRating();

    expect(registerRating).toHaveBeenCalledTimes(1);
    expect(component.submitting()).toBe(true);

    response.next(publishedRating);
    response.complete();
  });

  it('sends a null comment when the optional comment is left empty', async () => {
    const { component, ratingRequest } = await createComponent('INQUILINO');
    component.criteria.forEach((criterion) => component.setRating(criterion.id, 3));

    component.publishRating();

    expect(ratingRequest).toHaveBeenCalledWith(
      12,
      expect.objectContaining({ comentario: null }),
    );
  });

  it('reports the backend duplicate-rating validation detail', async () => {
    const registerRating = vi.fn(() =>
      throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: { detail: 'Ya has valorado esta experiencia' },
          }),
      ),
    );
    const { component } = await createComponent('INQUILINO', [finishedExperience], registerRating);
    component.criteria.forEach((criterion) => component.setRating(criterion.id, 5));

    component.publishRating();

    expect(component.errorMessage()).toBe('Ya has valorado esta experiencia.');
  });
});
