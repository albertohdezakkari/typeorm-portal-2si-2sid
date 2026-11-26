import { listarAsignacionesPorMuestraRepository } from './repository.mjs';

export function listarAsignacionesPorMuestraService(muestraId) {
  return listarAsignacionesPorMuestraRepository(muestraId);
}
