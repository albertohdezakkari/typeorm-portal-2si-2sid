import { modificarDuracionHorasRepository } from './repository.mjs';

export function modificarDuracionHorasService(excursionId, duracionHoras) {
  return modificarDuracionHorasRepository(excursionId, duracionHoras);
}
