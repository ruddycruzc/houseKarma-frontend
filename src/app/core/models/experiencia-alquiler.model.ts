export type EstadoExperiencia =
  | 'PENDIENTE_CONFIRMACION'
  | 'CONFIRMADA'
  | 'FINALIZADA'
  | 'CANCELADA';

export interface ExperienciaAlquiler {
  id: number;
  viviendaId: number;
  viviendaDireccion: string;
  viviendaNumero: string | null;
  viviendaComplemento: string | null;
  viviendaLocalidad: string;
  viviendaCodigoPostal: string;
  viviendaProvincia: string;
  inquilinoId: number;
  inquilinoNombre: string;
  inquilinoApellidos: string;
  caseroId: number;
  caseroNombre: string;
  caseroApellidos: string;
  fechaInicio: string;
  fechaFin: string | null;
  estado: EstadoExperiencia;
  confirmacionInquilino: boolean;
  confirmacionCasero: boolean;
  fechaRegistro: string;
}

export interface ExperienciaAlquilerPendiente {
  id: number;
  inquilinoNombre: string;
  inquilinoApellidos: string;
  viviendaId: number;
  viviendaDireccion: string;
  viviendaNumero: string | null;
  viviendaComplemento: string | null;
  viviendaLocalidad: string;
  viviendaCodigoPostal: string;
  viviendaProvincia: string;
  fechaInicio: string;
  fechaFin: string | null;
  estado: EstadoExperiencia;
  confirmacionInquilino: boolean;
  confirmacionCasero: boolean;
  fechaRegistro: string;
}