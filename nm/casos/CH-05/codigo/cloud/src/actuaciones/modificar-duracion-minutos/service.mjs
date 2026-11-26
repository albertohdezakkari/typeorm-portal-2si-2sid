import { modificarDuracionMinutosRepository } from './repository.mjs';

export function modificarDuracionMinutosService(actuacionId, duracionMinutos) {
  return modificarDuracionMinutosRepository(actuacionId, duracionMinutos);
}
