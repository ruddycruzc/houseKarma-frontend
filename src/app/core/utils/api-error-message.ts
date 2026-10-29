import { HttpErrorResponse } from '@angular/common/http';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function safeMessage(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const message = value.trim();

  if (
    !message ||
    /\b(?:select|insert|update|delete|drop|alter)\s+/i.test(message) ||
    /(?:Exception|StackTrace|Traceback)| at [\w.$]+\([^)]*:\d+\)/i.test(message)
  ) {
    return null;
  }

  return message;
}

function errorMessages(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap(errorMessages);
  }

  const message = safeMessage(value);

  if (message) {
    return [message];
  }

  if (isRecord(value)) {
    return Object.values(value).flatMap(errorMessages);
  }

  return [];
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof HttpErrorResponse) || error.status >= 500) {
    return fallback;
  }

  const body: unknown = error.error;

  if (!isRecord(body)) {
    return fallback;
  }

  const details = safeMessage(body['detail']);
  const fieldErrors = errorMessages(body['errors']);
  const messages = [...new Set([details, ...fieldErrors].filter(
    (message): message is string => message !== null,
  ))];

  return messages.length > 0 ? messages.join(' ') : fallback;
}
