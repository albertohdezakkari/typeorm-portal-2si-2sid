import { eliminarSesionRepository } from './repository.mjs';

export async function eliminarSesionService(sesionId) {
  await eliminarSesionRepository(sesionId);
}
