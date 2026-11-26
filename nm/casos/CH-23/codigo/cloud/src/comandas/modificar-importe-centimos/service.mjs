import { modificarImporteCentimosRepository } from './repository.mjs';

export function modificarImporteCentimosService(comandaId, importeCentimos) {
  return modificarImporteCentimosRepository(comandaId, importeCentimos);
}
