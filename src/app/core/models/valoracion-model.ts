export interface ValoracionCriterioRequest {
  criterio: string;
  puntuacion: number;
}

export interface ValoracionRequest {
  criterios: ValoracionCriterioRequest[];
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
