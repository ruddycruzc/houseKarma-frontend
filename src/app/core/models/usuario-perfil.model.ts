export interface UsuarioPerfil {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string | null;
  avatar: string | null;
  rol: 'INQUILINO' | 'CASERO' | 'ADMIN';
}