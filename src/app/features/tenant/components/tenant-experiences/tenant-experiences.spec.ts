import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantExperiences } from './tenant-experiences';

describe('TenantExperiences', () => {
  let component: TenantExperiences;
  let fixture: ComponentFixture<TenantExperiences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantExperiences],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantExperiences);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows loading and error states before rendering the empty state', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Cargando tus experiencias');

    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('hasError', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No se han podido cargar');
  });

  it('displays the backend experience status and landlord details', () => {
    fixture.componentRef.setInput('experiences', [
      {
        id: 1,
        property: 'Calle Mayor, 4',
        location: 'Madrid, Madrid',
        landlord: 'Ana García',
        startDate: '2026-01-01',
        endDate: null,
        status: 'PENDIENTE_CONFIRMACION',
      },
    ]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Calle Mayor, 4');
    expect(fixture.nativeElement.textContent).toContain('Ana García');
    expect(fixture.nativeElement.textContent).toContain('Pendiente de confirmación');
  });
});
