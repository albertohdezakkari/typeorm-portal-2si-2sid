import { eliminarPublicacionRepository } from './repository.mjs';

export async function eliminarPublicacionService(publicacionId) {
  await eliminarPublicacionRepository(publicacionId);
}
