export interface ValoracionRequest {
  puntuacion: number;
  comentario: string | null;
}

export interface ValoracionResponse {
  id: number;
  experienciaId: number;
  autorId: number;
  autorNombre: string;
  destinatarioId: number;
  destinatarioNombre: string;
  puntuacion: number;
  comentario: string | null;
  fechaRegistro: string;
}
