import { modificarEsloraMetrosRepository } from './repository.mjs';

export function modificarEsloraMetrosService(embarcacionId, esloraMetros) {
  return modificarEsloraMetrosRepository(embarcacionId, esloraMetros);
}
