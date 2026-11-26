import { eliminarTrayectoRepository } from './repository.mjs';

export async function eliminarTrayectoService(trayectoId) {
  await eliminarTrayectoRepository(trayectoId);
}
