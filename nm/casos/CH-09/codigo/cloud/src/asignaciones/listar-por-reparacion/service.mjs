import { listarAsignacionesPorReparacionRepository } from './repository.mjs';

export function listarAsignacionesPorReparacionService(reparacionId) {
  return listarAsignacionesPorReparacionRepository(reparacionId);
}
