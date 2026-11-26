import { modificarPaginasRepository } from './repository.mjs';

export function modificarPaginasService(documentoId, paginas) {
  return modificarPaginasRepository(documentoId, paginas);
}
