import { listarAsignacionesPorLocutorRepository } from './repository.mjs';

export function listarAsignacionesPorLocutorService(locutorId) {
  return listarAsignacionesPorLocutorRepository(locutorId);
}
