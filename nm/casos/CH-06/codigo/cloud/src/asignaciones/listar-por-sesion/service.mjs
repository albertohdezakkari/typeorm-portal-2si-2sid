import { listarAsignacionesPorSesionRepository } from './repository.mjs';

export function listarAsignacionesPorSesionService(sesionId) {
  return listarAsignacionesPorSesionRepository(sesionId);
}
