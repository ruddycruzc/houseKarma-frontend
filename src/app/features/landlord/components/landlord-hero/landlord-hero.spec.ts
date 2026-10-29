import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPerfil } from '../../../../core/models/usuario-perfil.model';
import { LandlordHero } from './landlord-hero';

describe('LandlordHero', () => {
  let component: LandlordHero;
  let fixture: ComponentFixture<LandlordHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandlordHero],
    }).compileComponents();

    fixture = TestBed.createComponent(LandlordHero);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', {
      id: 1,
      nombre: 'Ada',
      apellidos: 'Lovelace',
      email: 'ada@example.test',
      telefono: null,
      avatar: null,
      rol: 'CASERO',
    } satisfies UsuarioPerfil);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
