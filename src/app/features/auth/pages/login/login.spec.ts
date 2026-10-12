
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Login } from './login';

describe('Login', () => {
  let fixture: ComponentFixture<Login>;
  let component: Login;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login page', () => {
    expect(component).toBeTruthy();
  });

  describe('form validation', () => {
    it('should reject an empty form', () => {
      expect(component['loginForm'].invalid).toBe(true);
    });

    it('should reject an invalid email', () => {
      component['loginForm'].controls.email.setValue('correo-invalido');

      expect(
        component['loginForm'].controls.email.hasError('email'),
      ).toBe(true);
    });

    it('should require an email', () => {
      component['loginForm'].controls.email.setValue('');

      expect(
        component['loginForm'].controls.email.hasError('required'),
      ).toBe(true);
    });

    it('should require a password', () => {
      component['loginForm'].controls.password.setValue('');

      expect(
        component['loginForm'].controls.password.hasError('required'),
      ).toBe(true);
    });

    it('should accept valid login data', () => {
      component['loginForm'].setValue({
        email: 'alex@example.com',
        password: 'Password123',
      });

      expect(component['loginForm'].valid).toBe(true);
    });
  });

  describe('password visibility', () => {
    it('should hide the password by default', () => {
      expect(component['showPassword']()).toBe(false);
    });

    it('should toggle password visibility', () => {
      component['togglePassword']();

      expect(component['showPassword']()).toBe(true);

      component['togglePassword']();

      expect(component['showPassword']()).toBe(false);
    });

    it('should update the password input type', () => {
      component['togglePassword']();
      fixture.detectChanges();

      const passwordInput = fixture.nativeElement.querySelector(
        '#password',
      ) as HTMLInputElement;

      expect(passwordInput.type).toBe('text');
    });
  });

  describe('form submission', () => {
    it('should mark fields as touched after invalid submission', () => {
      component['submitForm']();

      expect(component['submitted']()).toBe(true);
      expect(component['loginForm'].controls.email.touched).toBe(true);
      expect(component['loginForm'].controls.password.touched).toBe(true);
    });

    it('should show an error alert after invalid submission', () => {
      component['submitForm']();
      fixture.detectChanges();

      const alert = fixture.nativeElement.querySelector('[role="alert"]');

      expect(alert).not.toBeNull();
    });

    it('should render the email and password fields', () => {
      const element = fixture.nativeElement as HTMLElement;

      expect(element.querySelector('#email')).not.toBeNull();
      expect(element.querySelector('#password')).not.toBeNull();
    });

    it('should render the login button and registration link', () => {
      const element = fixture.nativeElement as HTMLElement;

      expect(element.querySelector('.submit-button')).not.toBeNull();
      expect(element.querySelector('a[routerLink="/register"]')).not.toBeNull();
    });
  });
});
