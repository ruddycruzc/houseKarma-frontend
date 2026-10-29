import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { ExperienciaAlquilerService } from '../../../../core/services/experiencia-alquiler.service';
import { TenantDashboard } from './tenant-dashboard';

describe('TenantDashboard', () => {
  let fixture: ComponentFixture<TenantDashboard>;
  let component: TenantDashboard;
  const profile = {
    id: 1,
    nombre: 'Lucía',
    apellidos: 'Martínez',
    email: 'lucia@example.com',
    telefono: null,
    avatar: null,
    rol: 'INQUILINO' as const,
  };
  const experience = {
    id: 2,
    viviendaId: 3,
    viviendaDireccion: 'Calle Mayor',
    viviendaNumero: '4',
    viviendaComplemento: null,
    viviendaLocalidad: 'Madrid',
    viviendaCodigoPostal: '28001',
    viviendaProvincia: 'Madrid',
    inquilinoId: 1,
    inquilinoNombre: 'Lucía',
    inquilinoApellidos: 'Martínez',
    caseroId: 5,
    caseroNombre: 'Ana',
    caseroApellidos: 'García',
    fechaInicio: '2026-01-01',
    fechaFin: null,
    estado: 'PENDIENTE_CONFIRMACION' as const,
    confirmacionInquilino: true,
    confirmacionCasero: false,
    fechaRegistro: '2026-01-01T10:00:00',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantDashboard],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: { getMyProfile: () => of(profile) },
        },
        {
          provide: ExperienciaAlquilerService,
          useValue: { obtenerMisExperiencias: () => of([experience]) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads one profile and one experiences list from their services', () => {
    expect(component.user()).toEqual(profile);
    expect(component.experiences()).toEqual([
      {
        id: 2,
        property: 'Calle Mayor, 4',
        location: 'Madrid, Madrid',
        landlord: 'Ana García',
        startDate: '2026-01-01',
        endDate: null,
        status: 'PENDIENTE_CONFIRMACION',
      },
    ]);
    expect(component.isExperiencesLoading()).toBe(false);
    expect(component.hasExperiencesError()).toBe(false);
  });

  it('shows the backend experience in the dashboard list', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.experience-list')?.textContent).toContain('Calle Mayor, 4');
    expect(element.querySelector('.experience-list')?.textContent).toContain(
      'Pendiente de confirmación',
    );
  });
});