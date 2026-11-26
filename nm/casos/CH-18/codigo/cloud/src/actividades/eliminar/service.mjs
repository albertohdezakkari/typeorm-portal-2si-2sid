import { eliminarActividadRepository } from './repository.mjs';

export async function eliminarActividadService(actividadId) {
  await eliminarActividadRepository(actividadId);
}
