import { listarAsignacionesPorPublicacionRepository } from './repository.mjs';

export function listarAsignacionesPorPublicacionService(publicacionId) {
  return listarAsignacionesPorPublicacionRepository(publicacionId);
}
