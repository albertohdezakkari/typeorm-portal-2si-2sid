import { modificarDuracionMinutosRepository } from './repository.mjs';

export function modificarDuracionMinutosService(programaId, duracionMinutos) {
  return modificarDuracionMinutosRepository(programaId, duracionMinutos);
}
