
import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

export type UserRole = 'INQUILINO' | 'CASERO';

export const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword
    ? null
    : { passwordsMismatch: true };
};

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected readonly selectedRole = signal<UserRole>('INQUILINO');
  protected readonly submitted = signal(false);
  protected readonly showPassword = signal(false);

  protected readonly registerForm = new FormGroup(
    {
      fullName: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(/\S/),
          Validators.maxLength(100),
        ],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(8),
        ],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    {
      validators: passwordsMatchValidator,
    },
  );

  protected passwordMismatch(): boolean {
    return this.registerForm.hasError('passwordsMismatch');
  }

  protected selectRole(role: UserRole): void {
    this.selectedRole.set(role);
  }

  protected togglePassword(): void {
    this.showPassword.update((visible) => !visible);
  }

  protected submitForm(): void {
    this.submitted.set(true);
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      return;
    }

    /*
     * Pendiente de integración con el backend Spring Boot.
     * La cuenta todavía no se crea ni se envían datos a ningún servicio.
     */
  }
}
