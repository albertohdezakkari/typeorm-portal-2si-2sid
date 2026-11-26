import { modificarDuracionSegundosRepository } from './repository.mjs';

export function modificarDuracionSegundosService(escenaId, duracionSegundos) {
  return modificarDuracionSegundosRepository(escenaId, duracionSegundos);
}
