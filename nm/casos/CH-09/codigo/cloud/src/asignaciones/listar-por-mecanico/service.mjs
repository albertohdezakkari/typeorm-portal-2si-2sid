import { listarAsignacionesPorMecanicoRepository } from './repository.mjs';

export function listarAsignacionesPorMecanicoService(mecanicoId) {
  return listarAsignacionesPorMecanicoRepository(mecanicoId);
}
