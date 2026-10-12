
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import {
  Register,
  passwordsMatchValidator,
} from './register';

describe('Register', () => {
  let fixture: ComponentFixture<Register>;
  let component: Register;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the register page', () => {
    expect(component).toBeTruthy();
  });

  describe('role selection', () => {
    it('should select INQUILINO by default', () => {
      expect(component['selectedRole']()).toBe('INQUILINO');
    });

    it('should allow selecting CASERO', () => {
      component['selectRole']('CASERO');

      expect(component['selectedRole']()).toBe('CASERO');
    });

    it('should update the selected role in the template', () => {
      component['selectRole']('CASERO');
      fixture.detectChanges();

      const landlordButton = fixture.nativeElement.querySelector(
        '.role-option.landlord',
      ) as HTMLButtonElement;

      expect(landlordButton.getAttribute('aria-pressed')).toBe('true');
      expect(landlordButton.classList.contains('selected')).toBe(true);
    });
  });

  describe('form validation', () => {
    it('should reject an empty form', () => {
      expect(component['registerForm'].invalid).toBe(true);
    });

    it('should reject a name containing only whitespace', () => {
      component['registerForm'].controls.fullName.setValue('   ');

      expect(
        component['registerForm'].controls.fullName.invalid,
      ).toBe(true);
    });

    it('should reject names longer than 100 characters', () => {
      component['registerForm'].controls.fullName.setValue('a'.repeat(101));

      expect(
        component['registerForm'].controls.fullName.hasError('maxlength'),
      ).toBe(true);
    });

    it('should reject an invalid email', () => {
      component['registerForm'].controls.email.setValue('correo-invalido');

      expect(
        component['registerForm'].controls.email.hasError('email'),
      ).toBe(true);
    });

    it('should reject a password shorter than eight characters', () => {
      component['registerForm'].controls.password.setValue('abc123');

      expect(
        component['registerForm'].controls.password.hasError('minlength'),
      ).toBe(true);
    });

    it('should reject passwords that do not match', () => {
      component['registerForm'].controls.password.setValue('Password123');
      component['registerForm'].controls.confirmPassword.setValue('Different123');

      expect(
        component['registerForm'].hasError('passwordsMismatch'),
      ).toBe(true);
    });

    it('should accept matching passwords', () => {
      component['registerForm'].controls.password.setValue('Password123');
      component['registerForm'].controls.confirmPassword.setValue('Password123');

      expect(
        component['registerForm'].hasError('passwordsMismatch'),
      ).toBe(false);
    });

    it('should validate matching passwords with the reusable validator', () => {
      const form = new FormGroup({
        password: new FormControl('Password123'),
        confirmPassword: new FormControl('Password123'),
      });

      expect(passwordsMatchValidator(form)).toBeNull();
    });

    it('should report a mismatch with the reusable validator', () => {
      const form = new FormGroup({
        password: new FormControl('Password123'),
        confirmPassword: new FormControl('Different123'),
      });

      expect(passwordsMatchValidator(form)).toEqual({
        passwordsMismatch: true,
      });
    });

    it('should accept valid registration data', () => {
      component['registerForm'].setValue({
        fullName: 'Alex García',
        email: 'alex@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
      });

      expect(component['registerForm'].valid).toBe(true);
    });
  });

  describe('password visibility', () => {
    it('should hide passwords by default', () => {
      expect(component['showPassword']()).toBe(false);
    });

    it('should toggle password visibility', () => {
      component['togglePassword']();

      expect(component['showPassword']()).toBe(true);

      component['togglePassword']();

      expect(component['showPassword']()).toBe(false);
    });

    it('should update password input types in the template', () => {
      component['togglePassword']();
      fixture.detectChanges();

      const passwordInput = fixture.nativeElement.querySelector(
        '#password',
      ) as HTMLInputElement;

      expect(passwordInput.type).toBe('text');
    });
  });

  describe('form submission', () => {
    it('should mark fields as touched when submitting an invalid form', () => {
      component['submitForm']();

      expect(component['submitted']()).toBe(true);
      expect(component['registerForm'].controls.fullName.touched).toBe(true);
      expect(component['registerForm'].controls.email.touched).toBe(true);
    });

    it('should show an error alert after invalid submission', () => {
      component['submitForm']();
      fixture.detectChanges();

      const alert = fixture.nativeElement.querySelector('[role="alert]');

      expect(alert).not.toBeNull();
    });

    it('should render all form fields and both role options', () => {
      const element = fixture.nativeElement as HTMLElement;

      expect(element.querySelector('#fullName')).not.toBeNull();
      expect(element.querySelector('#email')).not.toBeNull();
      expect(element.querySelector('#password')).not.toBeNull();
      expect(element.querySelector('#confirmPassword')).not.toBeNull();
      expect(element.querySelectorAll('.role-option').length).toBe(2);
    });

    it('should render the main submit button', () => {
      const button = fixture.nativeElement.querySelector(
        '.submit-button',
      ) as HTMLButtonElement;

      expect(button).not.toBeNull();
      expect(button.type).toBe('submit');
    });
  });
});
