import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { RegisterRequest } from '../../../../core/models/auth.models';

export type UserRole = 'INQUILINO' | 'CASERO';

export const registrationFieldsMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const email = control.get('email')?.value;
  const confirmEmail = control.get('confirmEmail')?.value;
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  const errors: ValidationErrors = {};

  if (email && confirmEmail && email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
    errors['emailsMismatch'] = true;
  }

  if (password && confirmPassword && password !== confirmPassword) {
    errors['passwordsMismatch'] = true;
  }

  return Object.keys(errors).length ? errors : null;
};

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly selectedRole = signal<UserRole>('INQUILINO');
  protected readonly submitted = signal(false);
  protected readonly showPassword = signal(false);
  protected readonly loading = signal(false);
  protected readonly apiError = signal('');
  protected readonly successMessage = signal('');

  protected readonly registerForm = new FormGroup(
    {
      nombre: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)],
      }),
      apellidos: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(150)],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email, Validators.maxLength(255)],
      }),
      confirmEmail: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email, Validators.maxLength(255)],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(72)],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(72)],
      }),
      telefono: new FormControl('', {
        nonNullable: true,
        validators: [Validators.maxLength(20)],
      }),
    },
    {
      validators: registrationFieldsMatchValidator,
    },
  );

  protected emailsMismatch(): boolean {
    return this.registerForm.hasError('emailsMismatch');
  }

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
    this.apiError.set('');
    this.successMessage.set('');
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid || this.loading()) {
      return;
    }

    const formValue = this.registerForm.getRawValue();

    const request: RegisterRequest = {
      nombre: formValue.nombre.trim(),
      apellidos: formValue.apellidos.trim(),
      email: formValue.email.trim(),
      confirmarEmail: formValue.confirmEmail.trim(),
      password: formValue.password,
      confirmarPassword: formValue.confirmPassword,
      telefono: formValue.telefono.trim() || undefined,
      rol: this.selectedRole(),
    };

    this.loading.set(true);

    this.authService.register(request).subscribe({
      next: () => {
        this.loading.set(false);

        void this.router.navigate(['/login'], {
          state: {
            registrationSuccess: true,
          },
        });
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        this.apiError.set(this.getErrorMessage(error));
      },
    });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'No se pudo conectar con el servidor. Comprueba que el backend esté iniciado.';
    }

    if (error.status === 409) {
      return 'Ya existe una cuenta con ese email.';
    }

    if (error.status === 400) {
      const message = error.error?.message;

      return typeof message === 'string'
        ? message
        : 'No se pudo crear la cuenta. Revisa los datos introducidos.';
    }

    return 'Ha ocurrido un error al crear tu cuenta. Inténtalo de nuevo.';
  }
}
