import { listarAsignacionesPorDocumentoRepository } from './repository.mjs';

export function listarAsignacionesPorDocumentoService(documentoId) {
  return listarAsignacionesPorDocumentoRepository(documentoId);
}
