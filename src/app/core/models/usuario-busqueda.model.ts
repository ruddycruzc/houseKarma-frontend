export interface UsuarioBusqueda {
  id: number;
  nombre: string;
  apellidos: string;
  avatar: string | null;
  rol: 'INQUILINO' | 'CASERO';
}
