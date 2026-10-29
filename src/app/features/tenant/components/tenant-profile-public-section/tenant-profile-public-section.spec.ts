import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';
import { TenantProfilePublicSection } from './tenant-profile-public-section';

describe('TenantProfilePublicSection', () => {
  let component: TenantProfilePublicSection;
  let fixture: ComponentFixture<TenantProfilePublicSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantProfilePublicSection],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantProfilePublicSection);
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
