import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TenantDashboard } from './tenant-dashboard';

describe('TenantDashboard', () => {
  let fixture: ComponentFixture<TenantDashboard>;
  let component: TenantDashboard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantDashboard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the greeting and reputation score', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('h1')?.textContent).toContain('Lucía');
    expect(element.querySelector('.score')?.textContent?.trim()).toBe('4,8');
  });

  it('should show all five reputation criteria', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelectorAll('.criteria-list li').length).toBe(5);
  });

  it('should show the call to action and quick links', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.search-cta')?.textContent).toContain('Buscar caseros');
    expect(element.querySelector('.quick-links')?.textContent).toContain('Mis experiencias');
    expect(element.querySelector('.quick-links')?.textContent).toContain('Editar perfil');
  });

  it('should show three rental experiences', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelectorAll('.experience-row').length).toBe(3);
    expect(element.querySelector('.experience-list')?.textContent).toContain('Piso en Gijón');
  });

  it('should show the pending valuation notice', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.pending-card')).toBeTruthy();
    expect(element.querySelector('.pending-card')?.textContent).toContain(
      'lista para ser valorada',
    );
  });

  it('should show the public profile preview', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.public-profile')?.textContent).toContain('Lucía Martínez');
  });

  it('should format scores using a decimal comma', () => {
    expect(component['formatScore'](4.8)).toBe('4,8');
  });
});