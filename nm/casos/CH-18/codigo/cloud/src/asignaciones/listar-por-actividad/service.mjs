import { listarAsignacionesPorActividadRepository } from './repository.mjs';

export function listarAsignacionesPorActividadService(actividadId) {
  return listarAsignacionesPorActividadRepository(actividadId);
}
