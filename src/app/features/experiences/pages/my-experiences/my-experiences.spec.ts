import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../../../core/services/auth.service';
import { ExperienciaAlquilerService } from '../../../../core/services/experiencia-alquiler.service';
import { ExperienciaAlquiler } from '../../../../core/models/experiencia-alquiler.model';
import { MyExperiences } from './my-experiences';

describe('MyExperiences', () => {
  let component: MyExperiences;
  let fixture: ComponentFixture<MyExperiences>;
  const experiences: ExperienciaAlquiler[] = [
    {
      id: 11,
      viviendaId: 7,
      viviendaDireccion: 'Calle Mayor',
      viviendaNumero: '4',
      viviendaComplemento: null,
      viviendaLocalidad: 'Madrid',
      viviendaCodigoPostal: '28001',
      viviendaProvincia: 'Madrid',
      inquilinoId: 2,
      inquilinoNombre: 'Inés',
      inquilinoApellidos: 'Pérez',
      caseroId: 1,
      caseroNombre: 'Rita',
      caseroApellidos: 'López',
      fechaInicio: '2025-01-01',
      fechaFin: null,
      estado: 'PENDIENTE_CONFIRMACION',
      confirmacionInquilino: true,
      confirmacionCasero: false,
      fechaRegistro: '2025-01-02T12:00:00',
    },
    {
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
    },
    {
      id: 14,
      viviendaId: 10,
      viviendaDireccion: 'Calle Río',
      viviendaNumero: '10',
      viviendaComplemento: null,
      viviendaLocalidad: 'Madrid',
      viviendaCodigoPostal: '28004',
      viviendaProvincia: 'Madrid',
      inquilinoId: 5,
      inquilinoNombre: 'Eva',
      inquilinoApellidos: 'Marín',
      caseroId: 1,
      caseroNombre: 'Rita',
      caseroApellidos: 'López',
      fechaInicio: '2024-06-01',
      fechaFin: '2024-11-30',
      estado: 'CONFIRMADA',
      confirmacionInquilino: true,
      confirmacionCasero: true,
      fechaRegistro: '2024-06-02T12:00:00',
    },
    {
      id: 13,
      viviendaId: 9,
      viviendaDireccion: 'Calle Sol',
      viviendaNumero: '9',
      viviendaComplemento: null,
      viviendaLocalidad: 'Madrid',
      viviendaCodigoPostal: '28003',
      viviendaProvincia: 'Madrid',
      inquilinoId: 4,
      inquilinoNombre: 'Luz',
      inquilinoApellidos: 'Díaz',
      caseroId: 1,
      caseroNombre: 'Rita',
      caseroApellidos: 'López',
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31',
      estado: 'CANCELADA',
      confirmacionInquilino: false,
      confirmacionCasero: false,
      fechaRegistro: '2023-01-02T12:00:00',
    },
  ];
  const confirmExperience = vi.fn(() => of({}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyExperiences],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { getRole: () => 'CASERO' } },
        {
          provide: ExperienciaAlquilerService,
          useValue: {
            obtenerMisExperiencias: () => of(experiences),
            confirmarExperiencia: confirmExperience,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyExperiences);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the statuses supplied by the backend without inferred states', () => {
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Pendiente de confirmación');
    expect(text).toContain('Finalizada');
    expect(text).toContain('Cancelada');
    expect(text).not.toContain('En curso');
    expect(text).not.toContain('Valoradas');
  });

  it('uses confirmedExperiences as the filtered CONFIRMADA collection', () => {
    expect(component.confirmedExperiences().map((experience) => experience.id)).toEqual([14]);
    expect(fixture.nativeElement.textContent).toContain('Experiencias confirmadas');
    expect(fixture.nativeElement.textContent).toContain('Eva Marín');
  });

  it('confirms a pending experience only after the explicit confirmation action', () => {
    expect(confirmExperience).not.toHaveBeenCalled();

    component.confirmExperience(component.pendingExperiences()[0]);

    expect(confirmExperience).toHaveBeenCalledWith(11);
  });

  it('filters the loaded history locally', () => {
    component.setSearchTerm('Calle Luna');

    expect(component.filteredExperiences().map((experience) => experience.id)).toEqual([12]);
  });

  it('opens the role-specific rating route with the selected experience id', () => {
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate');

    component.openRating(component.finishedExperiences()[0]);

    expect(navigate).toHaveBeenCalledWith(['/casero/experiencias/valorar'], {
      queryParams: { experienciaId: 12 },
    });
  });
});
