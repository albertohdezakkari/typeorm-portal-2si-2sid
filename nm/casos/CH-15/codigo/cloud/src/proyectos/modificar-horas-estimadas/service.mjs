import { modificarHorasEstimadasRepository } from './repository.mjs';

export function modificarHorasEstimadasService(proyectoId, horasEstimadas) {
  return modificarHorasEstimadasRepository(proyectoId, horasEstimadas);
}
