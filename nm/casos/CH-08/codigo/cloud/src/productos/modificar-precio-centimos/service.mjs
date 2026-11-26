import { modificarPrecioCentimosRepository } from './repository.mjs';

export function modificarPrecioCentimosService(productoId, precioCentimos) {
  return modificarPrecioCentimosRepository(productoId, precioCentimos);
}
