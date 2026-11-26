import { modificarDuracionMinutosRepository } from './repository.mjs';

export function modificarDuracionMinutosService(proyeccionId, duracionMinutos) {
  return modificarDuracionMinutosRepository(proyeccionId, duracionMinutos);
}
