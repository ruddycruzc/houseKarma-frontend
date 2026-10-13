
export interface RegisterRequest {
  nombre: string;
  apellidos: string;
  email: string;
  confirmarEmail: string;
  password: string;
  confirmarPassword: string;
  telefono?: string;
  rol: 'INQUILINO' | 'CASERO';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  rol: string;
}
