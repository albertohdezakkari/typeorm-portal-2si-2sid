import { listarAsignacionesPorInstructorRepository } from './repository.mjs';

export function listarAsignacionesPorInstructorService(instructorId) {
  return listarAsignacionesPorInstructorRepository(instructorId);
}
