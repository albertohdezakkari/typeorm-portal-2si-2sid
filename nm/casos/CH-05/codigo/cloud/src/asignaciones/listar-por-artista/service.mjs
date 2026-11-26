import { listarAsignacionesPorArtistaRepository } from './repository.mjs';

export function listarAsignacionesPorArtistaService(artistaId) {
  return listarAsignacionesPorArtistaRepository(artistaId);
}
