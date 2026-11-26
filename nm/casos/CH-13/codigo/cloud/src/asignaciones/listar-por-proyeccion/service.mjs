import { listarAsignacionesPorProyeccionRepository } from './repository.mjs';

export function listarAsignacionesPorProyeccionService(proyeccionId) {
  return listarAsignacionesPorProyeccionRepository(proyeccionId);
}
