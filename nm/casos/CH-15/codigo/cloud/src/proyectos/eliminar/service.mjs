import { eliminarProyectoRepository } from './repository.mjs';

export async function eliminarProyectoService(proyectoId) {
  await eliminarProyectoRepository(proyectoId);
}
