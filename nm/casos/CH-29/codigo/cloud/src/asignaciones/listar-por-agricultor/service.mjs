import { listarAsignacionesPorAgricultorRepository } from './repository.mjs';

export function listarAsignacionesPorAgricultorService(agricultorId) {
  return listarAsignacionesPorAgricultorRepository(agricultorId);
}
