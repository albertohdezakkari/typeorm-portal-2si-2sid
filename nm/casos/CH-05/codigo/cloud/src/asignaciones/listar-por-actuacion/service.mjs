import { listarAsignacionesPorActuacionRepository } from './repository.mjs';

export function listarAsignacionesPorActuacionService(actuacionId) {
  return listarAsignacionesPorActuacionRepository(actuacionId);
}
