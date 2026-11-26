import { buscarActividadRepository, buscarMonitorRepository, asignarMonitorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarMonitorService(actividadId, monitorId, rol) {
  const actividad = await buscarActividadRepository(actividadId);
  const monitor = await buscarMonitorRepository(monitorId);
  if (!actividad || !monitor) {
    throw new ReferenciaInexistenteError('No existe la actividad o el monitor');
  }
  return asignarMonitorRepository(actividadId, monitorId, rol);
}
