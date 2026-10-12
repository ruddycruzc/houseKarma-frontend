
import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected readonly submitted = signal(false);
  protected readonly showPassword = signal(false);

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
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    /*
     * Pendiente: integrar el endpoint de autenticación de Spring Boot.
     * No se inicia sesión hasta conectar el backend.
     */
  }
}
