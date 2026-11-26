import { listarAsignacionesPorInspectorRepository } from './repository.mjs';

export function listarAsignacionesPorInspectorService(inspectorId) {
  return listarAsignacionesPorInspectorRepository(inspectorId);
}
