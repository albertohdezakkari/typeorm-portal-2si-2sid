import { modificarAntiguedadAniosRepository } from './repository.mjs';

export function modificarAntiguedadAniosService(piezaId, antiguedadAnios) {
  return modificarAntiguedadAniosRepository(piezaId, antiguedadAnios);
}
