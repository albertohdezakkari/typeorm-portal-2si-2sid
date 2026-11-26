import { listarAsignacionesPorJardineroRepository } from './repository.mjs';

export function listarAsignacionesPorJardineroService(jardineroId) {
  return listarAsignacionesPorJardineroRepository(jardineroId);
}
