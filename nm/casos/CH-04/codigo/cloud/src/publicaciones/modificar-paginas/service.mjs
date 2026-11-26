import { modificarPaginasRepository } from './repository.mjs';

export function modificarPaginasService(publicacionId, paginas) {
  return modificarPaginasRepository(publicacionId, paginas);
}
