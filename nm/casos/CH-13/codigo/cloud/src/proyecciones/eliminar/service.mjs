import { eliminarProyeccionRepository } from './repository.mjs';

export async function eliminarProyeccionService(proyeccionId) {
  await eliminarProyeccionRepository(proyeccionId);
}
