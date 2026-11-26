import { listarAsignacionesPorAutorRepository } from './repository.mjs';

export function listarAsignacionesPorAutorService(autorId) {
  return listarAsignacionesPorAutorRepository(autorId);
}
