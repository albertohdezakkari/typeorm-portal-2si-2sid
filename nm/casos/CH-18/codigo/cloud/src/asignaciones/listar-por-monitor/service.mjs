import { listarAsignacionesPorMonitorRepository } from './repository.mjs';

export function listarAsignacionesPorMonitorService(monitorId) {
  return listarAsignacionesPorMonitorRepository(monitorId);
}
