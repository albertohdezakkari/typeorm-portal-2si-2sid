import { listarAsignacionesPorProyectoRepository } from './repository.mjs';

export function listarAsignacionesPorProyectoService(proyectoId) {
  return listarAsignacionesPorProyectoRepository(proyectoId);
}
