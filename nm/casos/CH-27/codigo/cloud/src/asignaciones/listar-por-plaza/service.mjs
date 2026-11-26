import { listarAsignacionesPorPlazaRepository } from './repository.mjs';

export function listarAsignacionesPorPlazaService(plazaId) {
  return listarAsignacionesPorPlazaRepository(plazaId);
}
