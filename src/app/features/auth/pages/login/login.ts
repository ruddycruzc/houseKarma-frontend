
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly submitted = signal(false);
  protected readonly showPassword = signal(false);
  protected readonly loading = signal(false);
  protected readonly apiError = signal('');

  protected readonly registrationSuccess = signal(
    history.state?.registrationSuccess === true,
  );

  protected readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected togglePassword(): void {
    this.showPassword.update((visible) => !visible);
  }

  protected submitForm(): void {
    this.submitted.set(true);
    this.apiError.set('');
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid || this.loading()) {
      return;
    }

    this.loading.set(true);

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        this.loading.set(false);

        const destination =
          response.rol === 'ADMIN'
            ? '/admin/dashboard'
            : response.rol === 'CASERO'
              ? '/casero/dashboard'
              : '/inquilino/dashboard';

        void this.router.navigate([destination]);
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

    if (error.status === 401 || error.status === 403) {
      return 'El email o la contraseña no son correctos.';
    }

    if (error.status === 400) {
      return 'Revisa el email y la contraseña introducidos.';
    }

    return 'Ha ocurrido un error al iniciar sesión. Inténtalo de nuevo.';
  }
}
