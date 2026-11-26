import { eliminarActuacionRepository } from './repository.mjs';

export async function eliminarActuacionService(actuacionId) {
  await eliminarActuacionRepository(actuacionId);
}
