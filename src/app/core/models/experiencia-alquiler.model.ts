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
  estado: 'PENDIENTE_CONFIRMACION' | 'CONFIRMADA' | 'FINALIZADA' | 'CANCELADA';
  confirmacionInquilino: boolean;
  confirmacionCasero: boolean;
  fechaRegistro: string;
}

export interface ExperienciaAlquilerListado {
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

  estado:
    | 'PENDIENTE_CONFIRMACION'
    | 'CONFIRMADA'
    | 'FINALIZADA'
    | 'CANCELADA';

  confirmacionInquilino: boolean;
  confirmacionCasero: boolean;
  fechaRegistro: string;
}
