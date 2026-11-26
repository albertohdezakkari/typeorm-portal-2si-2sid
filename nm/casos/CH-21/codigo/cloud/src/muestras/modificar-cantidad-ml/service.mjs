import { modificarCantidadMlRepository } from './repository.mjs';

export function modificarCantidadMlService(muestraId, cantidadMl) {
  return modificarCantidadMlRepository(muestraId, cantidadMl);
}
