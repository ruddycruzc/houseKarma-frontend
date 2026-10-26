export interface Vivienda {
  id: number;
  direccion: string;
  numero: string;
  complemento: string | null;
  localidad: string;
  codigoPostal: string;
  provincia: string;
  fechaRegistro: string;
}
