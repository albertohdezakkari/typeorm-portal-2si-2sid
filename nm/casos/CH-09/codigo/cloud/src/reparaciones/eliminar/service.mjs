import { eliminarReparacionRepository } from './repository.mjs';

export async function eliminarReparacionService(reparacionId) {
  await eliminarReparacionRepository(reparacionId);
}
