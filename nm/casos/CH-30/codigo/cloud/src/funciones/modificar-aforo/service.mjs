import { modificarAforoRepository } from './repository.mjs';

export function modificarAforoService(funcionId, aforo) {
  return modificarAforoRepository(funcionId, aforo);
}
