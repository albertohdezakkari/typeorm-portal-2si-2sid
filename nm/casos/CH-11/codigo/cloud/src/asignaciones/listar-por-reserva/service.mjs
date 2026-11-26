import { listarAsignacionesPorReservaRepository } from './repository.mjs';

export function listarAsignacionesPorReservaService(reservaId) {
  return listarAsignacionesPorReservaRepository(reservaId);
}
