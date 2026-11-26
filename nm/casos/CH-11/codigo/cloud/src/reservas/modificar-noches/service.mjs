import { modificarNochesRepository } from './repository.mjs';

export function modificarNochesService(reservaId, noches) {
  return modificarNochesRepository(reservaId, noches);
}
