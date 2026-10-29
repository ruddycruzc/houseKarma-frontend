import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';
import { TenantHero } from './tenant-hero';

describe('TenantHero', () => {
  let component: TenantHero;
  let fixture: ComponentFixture<TenantHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantHero],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantHero);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', {
      id: 1,
      nombre: 'Ada',
      apellidos: 'Lovelace',
      email: 'ada@example.test',
      telefono: null,
      avatar: null,
      rol: 'INQUILINO',
    } satisfies UsuarioPerfil);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
