import { HttpErrorResponse } from '@angular/common/http';
import { getApiErrorMessage } from './api-error-message';

describe('getApiErrorMessage', () => {
  const fallback = 'No se pudo completar la operación.';

  it('uses the ProblemDetail detail and field errors', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: {
        detail: 'Uno o varios campos no son válidos.',
        errors: {
          nombre: 'El nombre es obligatorio.',
          _global: 'Los datos no coinciden.',
        },
      },
    });

    expect(getApiErrorMessage(error, fallback)).toBe(
      'Uno o varios campos no son válidos. El nombre es obligatorio. Los datos no coinciden.',
    );
  });

  it('accepts a string errors value without assuming it is an object', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: { errors: 'Solicitud inválida.' },
    });

    expect(getApiErrorMessage(error, fallback)).toBe('Solicitud inválida.');
  });

  it('uses the fallback when the body has no usable message', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: { detail: 'org.example.InternalException: failure' },
    });

    expect(getApiErrorMessage(error, fallback)).toBe(fallback);
  });

  it('does not expose server-error details', () => {
    const error = new HttpErrorResponse({
      status: 500,
      error: { detail: 'Internal server error' },
    });

    expect(getApiErrorMessage(error, fallback)).toBe(fallback);
  });
});
