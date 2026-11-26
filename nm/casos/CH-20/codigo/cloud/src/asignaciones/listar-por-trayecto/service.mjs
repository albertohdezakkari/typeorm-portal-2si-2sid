import { listarAsignacionesPorTrayectoRepository } from './repository.mjs';

export function listarAsignacionesPorTrayectoService(trayectoId) {
  return listarAsignacionesPorTrayectoRepository(trayectoId);
}
