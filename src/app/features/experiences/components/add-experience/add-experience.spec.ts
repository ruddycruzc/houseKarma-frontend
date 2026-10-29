import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AddExperience } from './add-experience';
import { AuthService } from '../../../../core/services/auth.service';
import { ViviendaService } from '../../../../core/services/vivienda.service';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { ExperienciaAlquilerService } from '../../../../core/services/experiencia-alquiler.service';

describe('AddExperience', () => {
  let component: AddExperience;
  let fixture: ComponentFixture<AddExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExperience],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { getRole: () => 'CASERO' } },
        { provide: ViviendaService, useValue: { listarMisViviendas: () => of([]) } },
        { provide: UsuarioService, useValue: { buscarUsuarios: () => of([]) } },
        {
          provide: ExperienciaAlquilerService,
          useValue: { registrarExperiencia: () => of({}) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddExperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
